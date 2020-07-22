import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { TfsService } from '../../services/tfs.service';

@Component({
  selector: "app-project-resource",
  templateUrl: "./project-resource.component.html",
  styleUrls: ["./project-resource.component.css"]
})
export class ProjectResourceComponent implements OnInit {
  resourceStatsData: any[];
  iterationType: string;

  constructor(
    private route: ActivatedRoute,
    private tfs: TfsService,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(q => {
      const current = q['current'];

      this.tfs.getSetting().subscribe(setting => {

        if (current === '1') {
          this.tfs.getCurrent(setting['tfsProjTeams'] || {}).subscribe(report => {
            this.iterationType = 'Current Iteration';
            this.resourceStatsData = report.resourcesStats;
          });
        } else {
          this.tfs.getAll(setting['tfsProjTeams'] || {}).subscribe(report => {
            this.iterationType = "All Pending";
            this.resourceStatsData = report.resourcesStats;
          });
        }

      });
    });
  }
}
