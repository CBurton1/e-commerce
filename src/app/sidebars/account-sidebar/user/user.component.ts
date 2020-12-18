import { Component, Input } from "@angular/core";

@Component({
  selector: "ecs-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.scss"]
})
export class UserComponent {
  @Input() public user!: ECS.User;

  constructor() {}
}
