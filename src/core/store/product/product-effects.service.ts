import { Injectable } from "@angular/core";
import { Actions } from "@ngrx/effects";

@Injectable({
  providedIn: "root"
})
export class ProductEffectsService {
  constructor(private actions: Actions) {}
}
