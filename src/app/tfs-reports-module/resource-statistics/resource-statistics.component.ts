import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { ResourceStats } from "../../dto/iterationReport";
import { Location } from "@angular/common";

@Component({
  selector: "app-resource-statistics",
  templateUrl: "./resource-statistics.component.html",
  styleUrls: ["./resource-statistics.component.css"]
})
export class ResourceStatisticsComponent implements OnInit {
  @Input() resourceStatsData: ResourceStats[];
  resourceStats: MatTableDataSource<ResourceStats>;
  displayedColumns: string[] = [
    "resourceName",
    "originalEstimate",
    "completedWork",
    "remainingWork"
  ];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  iterationType: string;
  projectDetail = [];
  constructor(
    private location: Location
  ) { }

  ngOnInit() {

    //this.getProjectList();
    this.resourceStats = new MatTableDataSource(this.resourceStatsData);
    this.resourceStats.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.resourceStats.filter = filterValue.trim().toLowerCase();
  }

  back() {
    this.location.back();
  }
}
