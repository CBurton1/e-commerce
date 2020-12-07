import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

// @ts-ignore
google.charts.load("current", {
  packages: ["orgchart"],
});

@Component({
  selector: "ecs-org-chart",
  templateUrl: "./org-chart.component.html",
  styleUrls: ["./org-chart.component.scss"]
})
export class OrgChartComponent implements OnInit {
  @Output() public categoriesChanged: EventEmitter<any> = new EventEmitter<any>();
  @Output() public categoryClicked: EventEmitter<any> = new EventEmitter<any>();
  @Input() public categories: any;
  public diagram: any;
  public draggedNode: any;

  public ngOnInit(): void {
    // @ts-ignore
    google.charts.setOnLoadCallback(() => this.drawDiagram());
  }

  public drawDiagram(): void {
    const orgChart = this.categories;
    const template = (p: any) =>
      `
      <hidden data-id='${p.id}' />
      <hidden data-parent-id='${p.parentId}' />
      <h6>
        Title: ${p.title}
      </h6>
      <h7>
        ${p.label ? "Label: " : ""} ${p.label}
      </h7>
      `;
    const orgChartDiv = document.getElementById("org-chart");

    if (orgChartDiv) {
      // @ts-ignore
      this.diagram = new google.visualization.OrgChart(orgChartDiv);

      // @ts-ignore
      google.visualization.events.addOneTimeListener(
        this.diagram,
        "ready",
        () => {
          const nodes: HTMLCollectionOf<Element> = window.document.getElementsByClassName(
            "org-chart-node",
          );
          // @ts-ignore
          Array(...nodes).forEach((node: any, index: number) => {
            if (node.title !== "Shop") {
              node.setAttribute("draggable", "true");
              node.addEventListener("dragstart", (event: any) => this.dragStart(event));
              node.addEventListener("dragenter", (event: any) => this.dragEnter(event));
              node.addEventListener("dragexit", () => (this.draggedNode = null));
              node.addEventListener("dragleave", (event: any) => this.dragLeave(event));
            }

            node.addEventListener("dragover", (event: any) => this.dragEnter(event));
            node.addEventListener("drop", (event: any) => this.drop(event));
            node.addEventListener("click", () => this.categoryClicked.emit(node.title));
          });
        },
      );

      // @ts-ignore
      const data = new google.visualization.DataTable();

      data.addColumn("string", "Name");
      data.addColumn("string", "Manager");
      data.addColumn("string", "ToolTip");

      // transform our domain model into a google charts 'view model'
      const categories = orgChart.map((p: any) => {
        return [
          // using google chart template syntax
          { v: `${p.id}`, f: template(p) },
          // stop the chart displaying a blank box if there is no parent
          !p.parentId || p.parentId === "0" ? null : `${p.parentId}`,
          // display the category title
          p.title
        ];
      });

      data.addRows(categories);

      this.diagram.draw(data, {
        size: "large",
        allowHtml: true,
        nodeClass: "org-chart-node",
      });
    }
  }

  public getIds(element: any): any {
    if (element) {
      const id = element.querySelector("hidden[data-id]");
      const parentId = element.querySelector("hidden[data-parent-id]");

      if (id && parentId) {
        return {
          id: id.getAttribute("data-id"),
          parentId: parentId.getAttribute("data-parent-id"),
        };
      }
    }
  }

  public dragLeave(event: any): void {
    const element = event.target;
    setTimeout(() => {
      // timeout yields nicer UX (less flicker)
      element.classList.remove("do-not-drop");
      element.classList.remove("do-drop");
    }, 250);
  }

  public dragStart(event: any): void {
    const element = event.target;
    const currentNode = this.getIds(element);

    if (currentNode) {
      this.draggedNode = currentNode;
    }
  }

  public drop(event: any): void {
    // make sure we are dropping on the parent TD
    // so we can get the id/parentID
    let element = event.target;

    if (element.tagName !== "TD") {
      while (element.parentElement) {
        element = element.parentElement;
        if (element.tagName === "TD") {
          break;
        }
      }
    }

    const dropNode = this.getIds(element);

    if (dropNode && this.draggedNode) {
      if (
        // don't drop into itself
        this.draggedNode.id !== dropNode.id &&
        // don't drop into it's own kids
        this.draggedNode.id !== dropNode.parentId
        // TODO make sure it's not any children recursive
      ) {
        this.update(
          this.draggedNode.id,
          dropNode.id,
        );
      }
    }
  }

  public dragEnter(event: any): void {
    event.preventDefault();
    const element = event.target;
    if (element.tagName === "TD") {
      const dropNode = this.getIds(element);
      if (dropNode && this.draggedNode) {
        if (
          // don't drop into itself
          this.draggedNode.id === dropNode.id ||
          // don't drop into it's own kids
          this.draggedNode.id === dropNode.parentId
        ) {
          element.classList.add("do-not-drop");
        } else {
          element.classList.add("do-drop");
        }
      }
    }
  }

  public update(id: any, parentId: any): void {
    // ya, use Immutable.js if you want - this is a quick and dirty hackeroo. Enjoy! ;)
    const categories = this.categories.slice(); // clone wars
    const index = categories.findIndex((category: any) => category.id === id);
    const category = categories[index];
    categories.splice(index, 1, {
      id: category.id,
      title: category.title,
      label: category.label,
      categoryId: category.categoryId,
      parentId,
    });
    this.categories = categories;
    this.categoriesChanged.emit(this.categories);
    this.drawDiagram();
  }
}
