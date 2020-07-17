import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { faSyncAlt, faCog } from '@fortawesome/free-solid-svg-icons'

import { StatusService } from 'src/app/services/status.servie';
import { Settings } from 'src/app/types';
import { TfsService } from '../tfs.service';

@Component({
  selector: 'app-tfs-dashboard',
  templateUrl: './tfs-dashboard.component.html',
  styleUrls: ['./tfs-dashboard.component.css']
})
export class TfsDashboardComponent implements OnInit {
  // TODO: remove dev config
  iterationReport: any;
  allPendingReport: any;
  activeTabIndex: number;
  userSettings: Settings = {};
  refreshIcon = faSyncAlt;
  period = 'current';
  settingClosed: Subject<void> = new Subject<void>();
  cogIcon = faCog;

  constructor(
    private router: Router,
    private status: StatusService,
    private tfs: TfsService,
  ) {
    this.status.getActiveTabIndex().subscribe(index => this.activeTabIndex = index);
  }

  ngOnInit() {
    this.getProjectDashboard();
  }

  getProjectDashboard() {
    this.tfs.getSetting().subscribe(setting => {
      this.userSettings = setting;

      if (!this.userSettings || !this.userSettings.tfsProjTeams) return;

      const config = this.userSettings.tfsProjTeams;

      if (this.period === 'current') {
        this.tfs.getCurrent(config).subscribe(
          report => this.iterationReport = report
        )
      } else if (this.period === 'all') {
        this.tfs.getAll(config).subscribe(
          report => this.allPendingReport = report
        )
      }
    })
  }

  goToResourceStats() {
    this.router.navigate(['/tfs-dashboard/resource-stats'], {
      queryParams: { current: 1 }
    });
  }

  goToPendingResourceStats() {
    this.router.navigate(['/tfs-dashboard/resource-stats'], {
      queryParams: { current: 0 }
    });
  }

  openedChangeHandler($open: boolean) {
    if (!$open) {
      this.settingClosed.next();
      this.getProjectDashboard();
    }
  }
}
