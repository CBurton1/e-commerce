import { Observable, from } from "rxjs";
import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection, QueryDocumentSnapshot, } from "@angular/fire/firestore";
import { switchMap, map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class UserService {
  public lastVisible: QueryDocumentSnapshot<ECS.User> | undefined;
  constructor(private afs: AngularFirestore) {}

  public createUser(user: ECS.User): Observable<ECS.User> {
    let usersCollection: AngularFirestoreCollection<ECS.User>;
    usersCollection = this.afs.collection<ECS.User>("users");

    return from(
      usersCollection.add(user)
    )
    .pipe(
      switchMap((documentReference) => {
        return documentReference.get();
      }),
      map((documentSnapshot) => {
        return {
          id: documentSnapshot.id,
          ...documentSnapshot.data()
        } as ECS.User;
      })
    );
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
