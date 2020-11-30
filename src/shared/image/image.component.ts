import { Component, Input, ViewChild, ElementRef } from "@angular/core";

@Component({
  selector: "ecs-image",
  styleUrls: ["./image.component.scss"],
  templateUrl: "./image.component.html"
})
export class ImageComponent {
  @ViewChild("small") public small!: ElementRef;
  @ViewChild("image") public image!: ElementRef;

  @Input() public smallSrc!: string;
  @Input() public imageSrc!: string;
  @Input() public aspectRatio!: number;

  public onSmallLoaded(): void {
    this.small.nativeElement.classList.add("-loaded");
  }

  public onImageLoaded(): void {
    this.image.nativeElement.classList.add("-loaded");
  }
}
