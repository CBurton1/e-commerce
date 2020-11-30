import { Observable, from } from "rxjs";
import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection, QueryDocumentSnapshot, } from "@angular/fire/firestore";
import { switchMap, map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class ProductService {
  public lastVisible: QueryDocumentSnapshot<ECS.Product> | undefined;
  constructor(private afs: AngularFirestore) {}

  public createProduct(product: ECS.Product): Observable<ECS.Product> {
    let productsCollection: AngularFirestoreCollection<ECS.Product>;
    productsCollection = this.afs.collection<ECS.Product>("products");

    return from(
      productsCollection.add(product)
    )
    .pipe(
      switchMap((documentReference) => {
        return documentReference.get();
      }),
      map((documentSnapshot) => {
        return {
          id: documentSnapshot.id,
          ...documentSnapshot.data()
        } as ECS.Product;
      })
    );
  }

  public readCategories(limit?: number): Observable<ECS.Product[]> {
    const productsCollection: Observable<ECS.Product[]> =
      from(this.afs.collection<ECS.Product>("products", (ref) => {
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
            } as ECS.Product;
          });
        })
      );

    return productsCollection;
  }

  public updateProduct(product: ECS.Product): Observable<ECS.Product> {
    let productsCollection: AngularFirestoreCollection<ECS.Product>;
    productsCollection = this.afs.collection<ECS.Product>("products");

    return from(
      productsCollection.doc(product.id).update(product)
    )
    .pipe(
      map(() => {
        return product;
      })
    );
  }

  public deleteCoffeeProduct(productId: string): Observable<void> {
    let productsCollection: AngularFirestoreCollection<ECS.Product>;
    productsCollection = this.afs.collection<ECS.Product>("products");

    return from(
      productsCollection.doc(productId).delete()
    );
  }
}
