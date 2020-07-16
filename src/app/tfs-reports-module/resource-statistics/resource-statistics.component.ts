import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { Location } from "@angular/common";

@Component({
  selector: "app-resource-statistics",
  templateUrl: "./resource-statistics.component.html",
  styleUrls: ["./resource-statistics.component.css"]
})
export class ResourceStatisticsComponent implements OnInit {
  @Input() 
  set resourceStatsData(val: any[]) {
    this.resourceStats = new MatTableDataSource(val);
  }
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  resourceStats: MatTableDataSource<any>;
  displayedColumns: string[] = [
    "resourceName",
    "originalEstimate",
    "completedWork",
    "remainingWork"
  ];
  iterationType: string;
  projectDetail = [];

  constructor(
    private location: Location
  ) { }

  ngOnInit() {
    this.resourceStats.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.resourceStats.filter = filterValue.trim().toLowerCase();
  }

  back() {
    this.location.back();
  }
}
