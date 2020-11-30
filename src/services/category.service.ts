import { Observable, from } from "rxjs";
import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection, QueryDocumentSnapshot, } from "@angular/fire/firestore";
import { switchMap, map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class CategoryService {
  public lastVisible: QueryDocumentSnapshot<ECS.Category> | undefined;
  constructor(private afs: AngularFirestore) {}

  public createCategory(category: ECS.Category): Observable<ECS.Category> {
    let categoriesCollection: AngularFirestoreCollection<ECS.Category>;
    categoriesCollection = this.afs.collection<ECS.Category>("categories");

    return from(
      categoriesCollection.add(category)
    )
    .pipe(
      switchMap((documentReference) => {
        return documentReference.get();
      }),
      map((documentSnapshot) => {
        return {
          id: documentSnapshot.id,
          ...documentSnapshot.data()
        } as ECS.Category;
      })
    );
  }

  public readCategories(limit?: number): Observable<ECS.Category[]> {
    const categoriesCollection: Observable<ECS.Category[]> =
      from(this.afs.collection<ECS.Category>("categories", (ref) => {
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
            } as ECS.Category;
          });
        })
      );

    return categoriesCollection;
  }

  public updateCategory(category: ECS.Category): Observable<ECS.Category> {
    let categoriesCollection: AngularFirestoreCollection<ECS.Category>;
    categoriesCollection = this.afs.collection<ECS.Category>("categories");

    return from(
      categoriesCollection.doc(category.id).update(category)
    )
    .pipe(
      map(() => {
        return category;
      })
    );
  }

  public deleteCoffeeOrder(categoryId: string): Observable<void> {
    let categoriesCollection: AngularFirestoreCollection<ECS.Category>;
    categoriesCollection = this.afs.collection<ECS.Category>("categories");

    return from(
      categoriesCollection.doc(categoryId).delete()
    );
  }
}
