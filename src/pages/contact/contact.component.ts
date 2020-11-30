import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { filter, tap } from "rxjs/operators";

import { State } from "../../core/store/";
import { ContactState, contactState } from "./contact.selectors";

@Component({
  selector: "ecs-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.scss"]
})
export class ContactComponent implements OnInit {
  public loading = false;
  public state: Observable<ContactState>;

  constructor(
    private store: Store<State>
  ) {
    this.state = this.store.select(contactState)
      .pipe(
        // @ts-ignore
        filter((state: ContactState) => !!state),
        tap((state: ContactState) => {
          console.log(state);
        })
      );
  }

  public ngOnInit(): void {
  }
}
