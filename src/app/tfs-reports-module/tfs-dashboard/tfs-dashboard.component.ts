import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons'

import { IterationReport } from 'src/app/dto/iterationReport';
import { CacheService } from 'src/app/services/cache.service';
import { SettingService } from 'src/app/services/setting.service';
import { StatusService } from 'src/app/services/status.servie';
import { Settings } from 'src/app/types';
import { faCog } from '@fortawesome/free-solid-svg-icons';
//TODO: cleanup dev support
// import { iterationReport as report } from 'src/app/mock';

@Component({
  selector: 'app-tfs-dashboard',
  templateUrl: './tfs-dashboard.component.html',
  styleUrls: ['./tfs-dashboard.component.css']
})
export class TfsDashboardComponent implements OnInit {
  // TODO: remove dev config
  // iterationReport: any;
  iterationReport: IterationReport;
  allPendingReport: IterationReport;
  showSpinner = false;
  activeTabIndex: number;
  userSettings: Settings = {};
  refreshIcon = faSyncAlt;
  period = 'current';
  settingClosed: Subject<void> = new Subject<void>();
  cogIcon = faCog;
  showSettingBtn = true;

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
    this.settingService.getProjectsTeamsFromDb().subscribe(s => {
      this.userSettings = s;

      if (this.userSettings && this.userSettings.tfsProjTeams) {

        if (this.period === 'current') {
          this.cacheService.getIterationReport(this.userSettings.tfsProjTeams).subscribe(
            resp => this.iterationReport = resp
          );
        } else {
          this.cacheService.getAllPendingReport(this.userSettings.tfsProjTeams).subscribe(
            resp => this.allPendingReport = resp
          );
        }
      }
    });
  }

  goToResourceStats() {
    this.cacheService.singleDetails = this.cacheService.data;
    this.router.navigate(['/tfs-dashboard/resource-stats'], {
      queryParams: { current: 1 }
    });
  }

  goToPendingResourceStats() {
    this.cacheService.singleDetails = this.cacheService.data;
    this.router.navigate(['/tfs-dashboard/resource-stats'], {
      queryParams: { current: 0 }
    });
  }

  openedChangeHandler($open: boolean) {
    if ($open) {
      this.showSettingBtn = false;
    } else {
      this.showSettingBtn = true;
      this.settingClosed.next();
      location.reload();
    }
  }

  refresh() {
    this.cacheService.clearCache();
    this.getProjectDashboard();
  }

  // reload() {
  //   // Emit event to setting component and reload
  //   this.settingClosed.next();
  //   location.reload();
  // }
}
