import { Observable, from } from "rxjs";
import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection, QueryDocumentSnapshot, } from "@angular/fire/firestore";
import { switchMap, map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class CouponService {
  public lastVisible: QueryDocumentSnapshot<ECS.Coupon> | undefined;
  constructor(private afs: AngularFirestore) {}

  public createCoupon(coupon: ECS.Coupon): Observable<ECS.Coupon> {
    let couponsCollection: AngularFirestoreCollection<ECS.Coupon>;
    couponsCollection = this.afs.collection<ECS.Coupon>("coupons");

    return from(
      couponsCollection.add(coupon)
    )
    .pipe(
      switchMap((documentReference) => {
        return documentReference.get();
      }),
      map((documentSnapshot) => {
        return {
          id: documentSnapshot.id,
          ...documentSnapshot.data()
        } as ECS.Coupon;
      })
    );
  }

  public readCoupons(limit?: number): Observable<ECS.Coupon[]> {
    const couponsCollection: Observable<ECS.Coupon[]> =
      from(this.afs.collection<ECS.Coupon>("coupons", (ref) => {
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
            } as ECS.Coupon;
          });
        })
      );

    return couponsCollection;
  }

  public updateCoupon(coupon: ECS.Coupon): Observable<ECS.Coupon> {
    let couponsCollection: AngularFirestoreCollection<ECS.Coupon>;
    couponsCollection = this.afs.collection<ECS.Coupon>("coupons");

    return from(
      couponsCollection.doc(coupon.id).update(coupon)
    )
    .pipe(
      map(() => {
        return coupon;
      })
    );
  }

  public deleteCoupon(couponId: string): Observable<string> {
    let couponsCollection: AngularFirestoreCollection<ECS.Coupon>;
    couponsCollection = this.afs.collection<ECS.Coupon>("coupons");

    return from(
      couponsCollection.doc(couponId).delete()
    )
    .pipe(
      map(() => couponId)
    );
  }
}

