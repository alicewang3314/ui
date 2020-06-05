import { Component, OnInit } from "@angular/core";
import { CacheService } from "../services/cache.service";
import { ActivatedRoute } from "@angular/router";
import { ResourceStats } from "../dto/iterationReport";

@Component({
  selector: "app-project-resource",
  templateUrl: "./project-resource.component.html",
  styleUrls: ["./project-resource.component.css"]
})
export class ProjectResourceComponent implements OnInit {
  resourceStatsData: ResourceStats[];
  iterationType: string;

  constructor(
    private cacheService: CacheService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    //console.log(this.cacheService.data);
    let current;
    this.route.queryParams.subscribe(q => {
      current = q["current"];
      if (current === "1") {
        this.cacheService
          .getIterationReport(this.cacheService.singleDetails)
          .subscribe(resp => {
            this.iterationType = "Current Iteration";
            this.resourceStatsData = resp.resourcesStats;
            //console.log(this.resourceStatsData);
          });
      } else {
        this.cacheService
          .getAllPendingReport(this.cacheService.singleDetails)
          .subscribe(resp => {
            this.iterationType = "All Pending";
            this.resourceStatsData = resp.resourcesStats;
          });
      }
    });
  }
}
