import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { faSyncAlt, faCog, faTable } from '@fortawesome/free-solid-svg-icons'

import { StatusService, TfsService } from 'src/app/services';
import { Settings } from 'src/app/types';

@Component({
  selector: 'app-tfs-dashboard',
  templateUrl: './tfs-dashboard.component.html',
  styleUrls: ['./tfs-dashboard.component.css']
})
export class TfsDashboardComponent implements OnInit {
  iterationReport: any;
  allPendingReport: any;
  userSettings: Settings = {};
  refreshIcon = faSyncAlt;
  cogIcon = faCog;
  resourceIcon = faTable;
  period = 'current';
  settingClosed: Subject<void> = new Subject<void>();
  errorMessage = null;

  constructor(
    private router: Router,
    private status: StatusService,
    private tfs: TfsService,
  ) { }

  ngOnInit() {
    this.restoreState();
    this.getProjectDashboard();
  }

  getProjectDashboard() {
    this.errorMessage = null;

    this.tfs.getSetting().subscribe(setting => {
      console.log('user setting', setting);

      this.userSettings = setting;

      if (!this.userSettings || !this.userSettings.tfsProjTeams) {
        this.errorMessage = 'No project selected. Please add project to setting.'
        return;
      }

      const config = this.userSettings.tfsProjTeams;

      if (this.period === 'current') {
        this.tfs.getCurrent(config).subscribe(report => {
          this.iterationReport = report;
          const { teams } = report;

          if (!teams || teams.length === 0) {
            this.errorMessage = 'No data for selected projects.'
          }
        });
        return;
      }

      this.tfs.getAll(config).subscribe(report => {
        this.allPendingReport = report;
        const { teams } = report;

        if (!teams || teams.length === 0) {
          this.errorMessage = 'No data for selected projects.'
        }
      });
    });
  }

  switchPeriod() {
    const newState = {
      period: this.period,
    };
    this.status.tfsDashboardState = newState;

    this.getProjectDashboard();
  }

  viewByResource() {
    const current = this.period === 'current' ? 1 : 0;

    this.router.navigate(['/tfs-dashboard/resource-stats'], {
      queryParams: { current }
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

  private restoreState() {
    const { period } = this.status.tfsDashboardState;

    if (period) {
      this.period = period;
    }
  }
}
