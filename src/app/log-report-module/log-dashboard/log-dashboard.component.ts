import { Component, OnInit } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { MatCheckboxChange } from '@angular/material/checkbox';
import * as _ from 'lodash';

import { StatusService } from 'src/app/services'

@Component({
  selector: 'app-log-dashboard',
  templateUrl: './log-dashboard.component.html',
  styleUrls: ['./log-dashboard.component.css'],
})
export class LogDashboardComponent implements OnInit {
  applications: { viewValue: string, value: string }[] = [
    { viewValue: 'All', value: '*' },
    { viewValue: 'CAPTOR', value: 'captor' },
    { viewValue: 'CDWS', value: 'cdws' },
    { viewValue: 'DOC0', value: 'doc' },
    { viewValue: 'GTS', value: 'gts' },
    { viewValue: 'IMS', value: 'ims' },
    { viewValue: 'LCM', value: 'lcm' },
    { viewValue: 'Note', value: 'note' },
    { viewValue: 'RAR', value: 'rar' },
    { viewValue: 'REPORTSBATCH', value: 'REPORTSBATCH' },
    { viewValue: 'VANS', value: 'vans' },
  ];
  application: string | undefined = '*';
  env: string = 'prod';
  dashBoardType = 'chart';
  toDatePickerValue: Date = new Date();
  fromDatePickerValue: Date = new Date(Date.now() - 864e5);
  isLive = true;
  iframeSourceUrl: SafeResourceUrl = '';

  constructor(
    private sanitizer: DomSanitizer,
    private state: StatusService
  ) {
    this.restoreState();
  }

  ngOnInit() {
    this.search();
  }

  restoreState() {
    const { app, env, type, to, from, isLive } = this.state.ErrorLogsDashboardState;

    this.application = app || this.application;
    this.env = env || this.env;
    this.dashBoardType = type || this.dashBoardType;
    this.toDatePickerValue = to ? new Date(to) : this.toDatePickerValue;
    this.fromDatePickerValue = from ? new Date(from) : this.fromDatePickerValue;
    this.isLive = isLive === undefined ? this.isLive : isLive;
  }

  updateState() {
    this.state.ErrorLogsDashboardState = {
      app: this.application,
      env: this.env,
      type: this.dashBoardType,
      to: this.toDatePickerValue,
      from: this.fromDatePickerValue,
      isLive: this.isLive,
    };
  }

  search() {
    this.iframeSourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.getDashboardSrcUrl(this.isLive));
    this.updateState();
  }

  toggleBoard(event: MatCheckboxChange) {
    const { checked } = event;
    this.isLive = checked;
    this.search();
  }

  getDashboardSrcUrl(isLive: boolean): string {
    const from = isLive ? 'now-15m' : this.fromDatePickerValue.toISOString();
    const to = isLive ? 'now' : (new Date(this.toDatePickerValue.getTime() + 864000)).toISOString();
    const appId = this.dashBoardType === 'chart' ? '6104de00-af43-11ea-b820-3944eb785351' : '3f244530-b008-11ea-b820-3944eb785351';
    const url = `/app/kibana#/dashboard/${appId}?embed=true&_g=(refreshInterval:(pause:!f,value:3000),time:(from:'${from}',to:'${to}'))&_a=(filters:!(),fullScreenMode:!f,options:(useMargins:!t),query:(language:kuery,query:'AppName:%20${this.application || '*'}%20and%20fields.env%20:%20${this.env || '*'}'),timeRestore:!f,viewMode:view)`;

    return `${environment.kibanaUrl}` + url;
  }
}
