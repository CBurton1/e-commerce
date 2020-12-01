import { Component, Input } from "@angular/core";

@Component({
  selector: "ecs-banner",
  templateUrl: "./banner.component.html",
  styleUrls: ["./banner.component.scss"]
})
export class BannerComponent {
  @Input() message!: string;
}
