import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { FormControl } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Observable } from "rxjs";
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons'

import { IterationReport } from "src/app/dto/iterationReport";
import { CacheService } from "src/app/services/cache.service";
import { SettingService } from 'src/app/services/setting.service';
import { StatusService } from 'src/app/services/status.servie';

import { Settings } from 'src/app/types';
//import { userInfo } from "os";

//TODO: cleanup dev support
// import { iterationReport as report } from 'src/app/mock';

@Component({
  selector: "app-tfs-dashboard",
  templateUrl: "./tfs-dashboard.component.html",
  styleUrls: ["./tfs-dashboard.component.css"]
})
export class TfsDashboardComponent implements OnInit {
  @Input() events: Observable<void>;
  @Input("Tasks") Tasks$;

  // TODO: remove dev config
  // iterationReport: any;
  iterationReport: IterationReport;
  allPendingReport: IterationReport;
  showSpinner: boolean = false;
  activeTabIndex: number;
  indexVal;
  projectDetail: any;
  newdata = [];
  missingValues = [];
  checkedValues = [];
  apiValues = [];
  userSettings: Settings = {};
  refreshIcon = faSyncAlt;

  // TODO: clean up
  period = 'current';


  constructor(
    private cacheService: CacheService,
    private settingService: SettingService,
    private router: Router,
    public dialog: MatDialog,
    private status: StatusService,
  ) {
    this.status.getActiveTabIndex().subscribe(index => this.activeTabIndex = index);
  }

  ngOnInit() {
    this.getProjectDashboard();
    //TODO: remove dev setup
    // this.iterationReport = report;
  }

  getProjectDashboard() {
    if (this.period === 'current') {
      this.settingService.getProjectsTeamsFromDb().subscribe(
        s => {
          this.userSettings = s;

          if (this.userSettings && this.userSettings.tfsProjTeams) {
            this.cacheService.getIterationReport(this.userSettings.tfsProjTeams).subscribe(
              resp => this.iterationReport = resp
            );
          }
        }
      );
    } else {
      this.settingService.getProjectsTeamsFromDb().subscribe(
        s => {
          this.userSettings = s;

          if (this.userSettings && this.userSettings.tfsProjTeams) {
            this.cacheService.getAllPendingReport(this.userSettings.tfsProjTeams).subscribe(
              resp => {
                this.allPendingReport = resp;
              }
            );
          }
        }
      );
    }
  }

  BacktoList() {
    this.router.navigate(["/tfsDashHome"]);
  }

  getReport(title: string) {
    this.router.navigate(["/dashboard/project", title], {
      queryParams: { current: 1 }
    });
  }

  getPendingReport(title: string) {
    this.router.navigate(["/tfs-dashboard/project", title], {
      queryParams: { current: 0 }
    });
  }

  GoToResourceStats() {
    this.cacheService.singleDetails = this.cacheService.data;
    this.router.navigate(["/tfs-dashboard/resource-stats"], {
      queryParams: { current: 1 }
    });
  }

  GoToPendingResourceStats() {
    this.cacheService.singleDetails = this.cacheService.data;
    this.router.navigate(["/tfs-dashboard/resource-stats"], {
      queryParams: { current: 0 }
    });
  }

  refresh() {
    this.cacheService.clearCache();
    this.getProjectDashboard();
  }

  onTabChange(index: number) {
    // this.cacheService.selectedTabIndex = index;
    this.status.activeTabIndex = index;
    this.getProjectDashboard();
  }

  updateDashboard() {
    console.log('update dashboard');
    this.getProjectDashboard();
  }
}
