import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { CacheService } from "../services/cache.service";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute } from "@angular/router";
import { MatSort } from "@angular/material/sort";
import { ResourceStats } from "../dto/iterationReport";
import { analyzeAndValidateNgModules } from "@angular/compiler";
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import { SettingService } from '../services/setting.service';
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
    private cacheService: CacheService,
    private route: ActivatedRoute,
    private router: Router,
    private settingService: SettingService,
    private location: Location
  ) { }

  ngOnInit() {

    //this.getProjectList();
    this.resourceStats = new MatTableDataSource(this.resourceStatsData);
    this.resourceStats.sort = this.sort;
  }

  // getProjectList() {
  //   //  this.resourceStats = new MatTableDataSource(this.resourceStatsData);
  //   // this.resourceStats.sort = this.sort;

  //   let current;
  //   this.route.queryParams.subscribe(q => {
  //     current = q["current"];

  //     if (current === "1") {
  //       // this.cacheService
  //       //   .getIterationReport(this.cacheService.singleDetails)
  //       //   .subscribe(resp => {
  //       //     this.iterationType = "Current Iteration";
  //       //     this.resourceStats = new MatTableDataSource(resp.resourcesStats);
  //       //     this.resourceStats.sort = this.sort;
  //       //   });
  //       this.settingService.getProjectsTeamsFromDb().subscribe(
  //         s => {

  //           this.cacheService.getIterationReport(s.tfsProjTeams).subscribe(
  //             resp => {
  //               this.iterationType = "Current Iteration";
  //               this.resourceStats = new MatTableDataSource(resp.resourcesStats);
  //               this.resourceStats.sort = this.sort;
  //             }
  //           );
  //         }
  //       );

  //     }
  //     else {
  //       this.cacheService
  //         .getAllPendingReport(this.cacheService.singleDetails)
  //         .subscribe(resp => {
  //           this.iterationType = "All Pending";
  //           this.resourceStats = new MatTableDataSource(resp.resourcesStats);
  //           this.resourceStats.sort = this.sort;
  //         });
  //     }
  //   });
  // }

  applyFilter(filterValue: string) {
    this.resourceStats.filter = filterValue.trim().toLowerCase();
  }

  Back() {
    //this.location.back();
    this.router.navigate(["/tfsDashHome"]);
  }
}
