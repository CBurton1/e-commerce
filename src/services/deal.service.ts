import { Observable, from } from "rxjs";
import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection, QueryDocumentSnapshot, } from "@angular/fire/firestore";
import { switchMap, map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class DealService {
  public lastVisible: QueryDocumentSnapshot<ECS.Deal> | undefined;
  constructor(private afs: AngularFirestore) {}

  public createDeal(deal: ECS.Deal): Observable<ECS.Deal> {
    let dealsCollection: AngularFirestoreCollection<ECS.Deal>;
    dealsCollection = this.afs.collection<ECS.Deal>("deals");

    return from(
      dealsCollection.add(deal)
    )
    .pipe(
      switchMap((documentReference) => {
        return documentReference.get();
      }),
      map((documentSnapshot) => {
        return {
          id: documentSnapshot.id,
          ...documentSnapshot.data()
        } as ECS.Deal;
      })
    );
  }

  public readDeals(limit?: number): Observable<ECS.Deal[]> {
    const dealsCollection: Observable<ECS.Deal[]> =
      from(this.afs.collection<ECS.Deal>("deals", (ref) => {
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
            } as ECS.Deal;
          });
        })
      );

    return dealsCollection;
  }

  public updateDeal(deal: ECS.Deal): Observable<ECS.Deal> {
    let dealsCollection: AngularFirestoreCollection<ECS.Deal>;
    dealsCollection = this.afs.collection<ECS.Deal>("deals");

    return from(
      dealsCollection.doc(deal.id).update(deal)
    )
    .pipe(
      map(() => {
        return deal;
      })
    );
  }

  public deleteDeal(dealId: string): Observable<string> {
    let dealsCollection: AngularFirestoreCollection<ECS.Deal>;
    dealsCollection = this.afs.collection<ECS.Deal>("deals");

    return from(
      dealsCollection.doc(dealId).delete()
    )
    .pipe(
      map(() => dealId)
    );
  }
}

