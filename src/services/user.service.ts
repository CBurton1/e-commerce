import { Observable, from, of, throwError } from "rxjs";
import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreCollection, QueryDocumentSnapshot, } from "@angular/fire/firestore";
import { switchMap, map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class UserService {
  public lastVisible: QueryDocumentSnapshot<ECS.User> | undefined;
  constructor(private afs: AngularFirestore, private auth: AngularFireAuth) {}

  public checkLogin(): Observable<ECS.User | null | undefined> {
    return this.auth.authState.pipe(
      switchMap(user => {
        if (user && user.emailVerified) {
          return this.afs.doc<ECS.User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      }),
    );
  }

  public createUser(signupData: ECS.SignUpData): Observable<ECS.User> {
    return this.createFirebaseAuthUser(signupData.email, signupData.password)
      .pipe(
        switchMap((userCredential: firebase.default.auth.UserCredential) => {
          return from(this.auth.currentUser);
        }),
        switchMap((currentUser: firebase.default.User | null) => {
          // @ts-ignore
          return from(currentUser.sendEmailVerification())
            .pipe(
              map(() => {
                return currentUser?.uid;
              })
            );
        }),
        switchMap((uid: string | undefined) => {
          const usersCollection: AngularFirestoreCollection<ECS.User> = this.afs.collection<ECS.User>("users");

          const userData = {
            email: signupData.email,
            emailVerified: false,
            firstName: signupData.firstName,
            lastName: signupData.lastName
          };

          return from(usersCollection.doc(uid).set(userData))
            .pipe(
              map(() => {
                return {
                  id: uid,
                  ...userData
                } as ECS.User;
              })
            );
        })
      );
  }

  public createFirebaseAuthUser(email: string, password: string): Observable<firebase.default.auth.UserCredential> {
    return from(this.auth.createUserWithEmailAndPassword(email, password));
  }

  public login(email: string, password: string): Observable<ECS.User> {
    return from(this.auth.signInWithEmailAndPassword(email, password))
      .pipe(
        switchMap((userCredential: firebase.default.auth.UserCredential) => {
          if (!userCredential.user?.emailVerified) {
            // @ts-ignore
            return from(userCredential.user?.sendEmailVerification())
              .pipe(
                switchMap(() => {
                  return this.logout();
                }),
                switchMap(() => {
                  return throwError({ code: "auth/email-not-verified", message: "Email not verified. Please check your email for a verification email" });
                })
            );
          } else {
            const usersCollection: AngularFirestoreCollection<ECS.User> = this.afs.collection<ECS.User>("users");
            return from(usersCollection.doc(userCredential.user?.uid).get());
          }
        }),
        map((documentSnapshot) => {
          return {
            id: documentSnapshot.id,
            ...documentSnapshot.data()
          } as ECS.User;
        })
      );
  }

  public resetPassword(newPassword: string, code: string): Observable<void> {
    return from(this.auth.confirmPasswordReset(code, newPassword));
  }

  public logout(): Observable<void> {
    return from(this.auth.signOut());
  }

  public sendPasswordResetEmail(email: string): Observable<void> {
    return from(this.auth.sendPasswordResetEmail(email));
  }

  public confirmEmail(verificationCode: string): Observable<void> {
    return from(this.auth.applyActionCode(verificationCode));
  }

  public readUsers(limit?: number): Observable<ECS.User[]> {
    const usersCollection: Observable<ECS.User[]> =
      from(this.afs.collection<ECS.User>("users", (ref) => {
        const query = this.lastVisible ?
          ref.orderBy("id").startAfter(this.lastVisible) :
          ref.orderBy("id");

        if (limit) {
          return query.limit(limit);
        } else {
          return query;
        }
      })
      .get())
      .pipe(
        map((documentSnapshots) => {
          this.lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
          return documentSnapshots.docs.map((documentSnapshot) => {
            const data = documentSnapshot.data();

            return {
              ...data,
              id: documentSnapshot.id,
            } as ECS.User;
          });
        })
      );

    return usersCollection;
  }

  public updateUser(user: ECS.User): Observable<ECS.User> {
    let usersCollection: AngularFirestoreCollection<ECS.User>;
    usersCollection = this.afs.collection<ECS.User>("users");

    return from(
      usersCollection.doc(user.id).update(user)
    )
    .pipe(
      map(() => {
        return user;
      })
    );
  }

  public deleteUser(userId: string): Observable<string> {
    let usersCollection: AngularFirestoreCollection<ECS.User>;
    usersCollection = this.afs.collection<ECS.User>("users");

    return from(
      usersCollection.doc(userId).delete()
    )
    .pipe(
      map(() => userId)
    );
  }
}
