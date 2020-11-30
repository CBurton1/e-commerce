import { Observable, from } from "rxjs";
import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection, QueryDocumentSnapshot, } from "@angular/fire/firestore";
import { switchMap, map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class OrderService {
  public lastVisible: QueryDocumentSnapshot<ECS.Order> | undefined;
  constructor(private afs: AngularFirestore) {}

  public createOrder(order: ECS.Order): Observable<ECS.Order> {
    let ordersCollection: AngularFirestoreCollection<ECS.Order>;
    ordersCollection = this.afs.collection<ECS.Order>("orders");

    return from(
      ordersCollection.add(order)
    )
    .pipe(
      switchMap((documentReference) => {
        return documentReference.get();
      }),
      map((documentSnapshot) => {
        return {
          id: documentSnapshot.id,
          ...documentSnapshot.data()
        } as ECS.Order;
      })
    );
  }

  public readCategories(limit?: number): Observable<ECS.Order[]> {
    const ordersCollection: Observable<ECS.Order[]> =
      from(this.afs.collection<ECS.Order>("orders", (ref) => {
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
            } as ECS.Order;
          });
        })
      );

    return ordersCollection;
  }

  public updateOrder(order: ECS.Order): Observable<ECS.Order> {
    let ordersCollection: AngularFirestoreCollection<ECS.Order>;
    ordersCollection = this.afs.collection<ECS.Order>("orders");

    return from(
      ordersCollection.doc(order.id).update(order)
    )
    .pipe(
      map(() => {
        return order;
      })
    );
  }

  public deleteCoffeeOrder(orderId: string): Observable<void> {
    let ordersCollection: AngularFirestoreCollection<ECS.Order>;
    ordersCollection = this.afs.collection<ECS.Order>("orders");

    return from(
      ordersCollection.doc(orderId).delete()
    );
  }
}
