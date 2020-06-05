import { Component, OnInit, ViewChild } from "@angular/core";
import { Location } from "@angular/common";
import { CacheService } from "../services/cache.service";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { MatSort } from "@angular/material/sort";
import {
  Task,
  IterationReport,
  ResourceStats,
  Iteration
} from "../dto/iterationReport";
import { SettingService } from '../services/setting.service';

@Component({
  selector: "app-team-details",
  templateUrl: "./project-details.component.html",
  styleUrls: ["./project-details.component.css"]
})
export class ProjectDetailsComponent implements OnInit {
  teamTasks: MatTableDataSource<Task>;
  teamResources: ResourceStats[];
  displayedColumns: string[] = [
    "id",
    "title",
    "assignedTo",
    "state",
    "originalEstimate",
    "completedWork",
    "remainingWork"
  ];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatSort, { static: true }) sortResources: MatSort;
  title: string;
  iterationType: string;
  iterationData: Iteration;

  constructor(
    private cacheService: CacheService,
    private route: ActivatedRoute,
    private settingService: SettingService,
    private location: Location
  ) { }

  ngOnInit() {
    let current;
    this.route.queryParams.subscribe(q => {
      current = q["current"];

      if (current === "1") {
        this.route.paramMap.subscribe(params =>
        // this.cacheService
        //  .getIterationReport(this.cacheService.singleDetails)
        //   .subscribe(resp => {
        //     this.iterationType = "Current Iteration";
        //     this.getDataFromIterationReport(resp, params);
        //   })
        {
          this.settingService.getProjectsTeamsFromDb().subscribe(
            s => {

              this.cacheService.getIterationReport(s.tfsProjTeams).subscribe(
                resp => {
                  this.iterationType = "Current Iteration";
                  this.getDataFromIterationReport(resp, params);
                }
              );
            }
          );
        }
        );
      }
      else {
        this.route.paramMap.subscribe(params =>
          this.cacheService.getAllPendingReport(this.cacheService.singleDetails)
            .subscribe(resp => {
              this.iterationType = "All Pending";
              this.getDataFromIterationReport(resp, params);
            })
        );
      }
    });
  }

  applyFilter(filterValue: string) {
    this.teamTasks.filter = filterValue.trim().toLowerCase();
  }

  getDataFromIterationReport(resp: IterationReport, params: ParamMap) {
    this.title = params.get("title");
    let team = resp.teams.find(p => p.title === this.title);
    this.teamTasks = new MatTableDataSource(team.currentTasks);
    this.teamTasks.sort = this.sort;

    this.teamResources = team.resourcesStats;
    this.teamTasks.sort = this.sortResources;

    this.iterationData = team.iteration;
  }

  back() {
    this.location.back();
  }
}
