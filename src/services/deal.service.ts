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
    let dealCollection: AngularFirestoreCollection<ECS.Deal>;
    dealCollection = this.afs.collection<ECS.Deal>("deals");

    return from(
      dealCollection.add(deal)
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

  public readCategories(limit?: number): Observable<ECS.Deal[]> {
    const dealCollection: Observable<ECS.Deal[]> =
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

    return dealCollection;
  }

  public updateDeal(deal: ECS.Deal): Observable<ECS.Deal> {
    let dealCollection: AngularFirestoreCollection<ECS.Deal>;
    dealCollection = this.afs.collection<ECS.Deal>("Deals");

    return from(
      dealCollection.doc(deal.id).update(deal)
    )
    .pipe(
      map(() => {
        return deal;
      })
    );
  }

  public deleteCoffeeOrder(dealId: string): Observable<void> {
    let dealCollection: AngularFirestoreCollection<ECS.Deal>;
    dealCollection = this.afs.collection<ECS.Deal>("deals");

    return from(
      dealCollection.doc(dealId).delete()
    );
  }
}
