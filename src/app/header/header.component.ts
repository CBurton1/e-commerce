import { Component, Input } from "@angular/core";

@Component({
  selector: "ecs-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent {
  @Input() public siteName!: string;
}
