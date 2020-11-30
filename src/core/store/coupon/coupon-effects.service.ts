import { Injectable } from "@angular/core";
import { Actions } from "@ngrx/effects";

@Injectable({
  providedIn: "root"
})
export class CouponEffectsService {
  constructor(private actions: Actions) {}
}
