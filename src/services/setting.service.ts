import { Observable, from } from "rxjs";
import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection, QueryDocumentSnapshot, } from "@angular/fire/firestore";
import { switchMap, map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class SettingService {
  public lastVisible: QueryDocumentSnapshot<ECS.Setting> | undefined;
  constructor(private afs: AngularFirestore) {}

  public createSetting(setting: ECS.Setting): Observable<ECS.Setting> {
    let settingsCollection: AngularFirestoreCollection<ECS.Setting>;
    settingsCollection = this.afs.collection<ECS.Setting>("settings");

    return from(
      settingsCollection.add(setting)
    )
    .pipe(
      switchMap((documentReference) => {
        return documentReference.get();
      }),
      map((documentSnapshot) => {
        return {
          id: documentSnapshot.id,
          ...documentSnapshot.data()
        } as ECS.Setting;
      })
    );
  }

  public readSettings(limit?: number): Observable<ECS.Setting[]> {
    const settingsCollection: Observable<ECS.Setting[]> =
      from(this.afs.collection<ECS.Setting>("settings", (ref) => {
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
            } as ECS.Setting;
          });
        })
      );

    return settingsCollection;
  }

  public updateSetting(setting: ECS.Setting): Observable<ECS.Setting> {
    let settingsCollection: AngularFirestoreCollection<ECS.Setting>;
    settingsCollection = this.afs.collection<ECS.Setting>("settings");

    return from(
      settingsCollection.doc(setting.id).update(setting)
    )
    .pipe(
      map(() => {
        return setting;
      })
    );
  }

  public deleteSetting(settingId: string): Observable<string> {
    let settingsCollection: AngularFirestoreCollection<ECS.Setting>;
    settingsCollection = this.afs.collection<ECS.Setting>("settings");

    return from(
      settingsCollection.doc(settingId).delete()
    )
    .pipe(
      map(() => settingId)
    );
  }
}
