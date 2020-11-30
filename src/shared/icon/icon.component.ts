import { Component, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";

@Component({
  selector: "ecs-icon",
  styleUrls: ["./icon.component.scss"],
  templateUrl: "./icon.component.html"
})
export class IconComponent implements OnInit, OnChanges {
  @Input() public type!: string;
  public class!: string;

  public ngOnInit(): void {
    this.class = `icon__${this.type}`;
  }

  public ngOnChanges(simpleChanges: SimpleChanges): void {
    if (simpleChanges.type) {
      this.class = `icon__${simpleChanges.type.currentValue}`;
    }
  }
}
