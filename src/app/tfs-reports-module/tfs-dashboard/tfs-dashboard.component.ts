import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { FormControl } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Observable } from "rxjs";
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons'

import { IterationReport } from "src/app/dto/iterationReport";
import { CacheService } from "src/app/services/cache.service";
import { SettingService } from 'src/app/services/setting.service';

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
  selectedTabIndex = new FormControl(0);
  indexVal;
  projectDetail: any;
  newdata = [];
  missingValues = [];
  checkedValues = [];
  apiValues = [];
  userSettings: Settings = {};
  refreshIcon = faSyncAlt;

  constructor(
    private cacheService: CacheService,
    private settingService: SettingService,
    // private iterationService: IterationService,
    private router: Router,
    public dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.getProjectDashboard();
    //TODO: remove dev setup
    // this.iterationReport = report;
  }

  getProjectDashboardOld() {
    this.selectedTabIndex.setValue(this.cacheService.selectedTabIndex);

    if (this.cacheService.selectedTabIndex == 0) {
      this.Tasks$.subscribe(user => {
        Object.keys(user).length === 0 ? (user = this.cacheService.data) : user;
        //  console.log(user);
        this.cacheService.getIterationReport(user).subscribe(resp => {
          this.iterationReport = resp;

          if (this.iterationReport.teams.length > 0) {

            if (user.length != this.iterationReport.teams.length) {
              user.map((item) => {
                this.checkedValues.push(item.value);
              });
              this.iterationReport.teams.map((item) => {
                this.apiValues.push(item.title)
              });
              this.missingValues = this.checkedValues.filter(item => this.apiValues.indexOf(item) < 0);
              this.cacheService.missingValue = this.missingValues;
              this.checkedValues = [];
            }
            else {
              this.checkedValues = [];
              this.apiValues = [];
              this.missingValues = [];
            }
          }
          else {
            user.map((item) => {
              this.missingValues.push(item.value);
            });
          }
          this.cacheService.data = user;
        });
      });
    }
    else {
      this.Tasks$.subscribe(user => {
        Object.keys(user).length === 0 ? (user = this.cacheService.data) : user;
        this.cacheService.getAllPendingReport(user).subscribe(resp => {
          this.allPendingReport = resp;
          this.cacheService.data = user;
        });
      });
    }
  }

  getProjectDashboard() {
    this.selectedTabIndex.setValue(this.cacheService.selectedTabIndex);

    if (this.cacheService.selectedTabIndex == 0) {
      this.settingService.getProjectsTeamsFromDb().subscribe(
        s => {
          this.userSettings = s

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
          this.userSettings = s

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

  getPendingReportOld(title: string) {
    this.newdata = [];
    this.projectDetail = this.cacheService.data;
    for (var i = 0; i < this.projectDetail.length; i++) {
      if (this.projectDetail[i].value == title) {
        this.newdata.push({
          name: this.projectDetail[i].name,
          value: this.projectDetail[i].value
        });
      }
    }
    this.cacheService.singleDetails = this.newdata;
    this.router.navigate(["/tfs-dashboard/project", title], {
      queryParams: { current: 0 }
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
    this.cacheService.selectedTabIndex = index;
    this.getProjectDashboard();
  }
}
