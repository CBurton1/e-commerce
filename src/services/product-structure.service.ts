import { Observable, from } from "rxjs";
import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection, QueryDocumentSnapshot, } from "@angular/fire/firestore";
import { switchMap, map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class ProductStructureService {
  public lastVisible: QueryDocumentSnapshot<ECS.ProductStructure> | undefined;
  constructor(private afs: AngularFirestore) {}

  public createProductStructure(productStructure: ECS.ProductStructure): Observable<ECS.ProductStructure> {
    let productStructuresCollection: AngularFirestoreCollection<ECS.ProductStructure>;
    productStructuresCollection = this.afs.collection<ECS.ProductStructure>("productStructures");

    return from(
      productStructuresCollection.add(productStructure)
    )
    .pipe(
      switchMap((documentReference) => {
        return documentReference.get();
      }),
      map((documentSnapshot) => {
        return {
          id: documentSnapshot.id,
          ...documentSnapshot.data()
        } as ECS.ProductStructure;
      }),
      switchMap((productStructure: ECS.ProductStructure) => {
        return this.updateProductStructure(productStructure);
      })
    );
  }

  public readProductStructures(limit?: number): Observable<ECS.ProductStructure[]> {
    const productStructuresCollection: Observable<ECS.ProductStructure[]> =
      from(this.afs.collection<ECS.ProductStructure>("productStructures", (ref) => {
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
            } as ECS.ProductStructure;
          });
        })
      );

    return productStructuresCollection;
  }

  public updateProductStructure(productStructure: ECS.ProductStructure): Observable<ECS.ProductStructure> {
    let productStructuresCollection: AngularFirestoreCollection<ECS.ProductStructure>;
    productStructuresCollection = this.afs.collection<ECS.ProductStructure>("productStructures");

    return from(
      productStructuresCollection.doc(productStructure.id).update(productStructure)
    )
    .pipe(
      map(() => {
        return productStructure;
      })
    );
  }

  public deleteProductStructure(productStructureId: string): Observable<string> {
    let productStructuresCollection: AngularFirestoreCollection<ECS.ProductStructure>;
    productStructuresCollection = this.afs.collection<ECS.ProductStructure>("productStructures");

    return from(
      productStructuresCollection.doc(productStructureId).delete()
    )
    .pipe(
      map(() => productStructureId)
    );
  }
}
