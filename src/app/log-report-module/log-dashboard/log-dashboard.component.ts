import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatSelectChange } from '@angular/material/select'

@Component({
  selector: 'app-log-dashboard',
  templateUrl: './log-dashboard.component.html',
  styleUrls: ['./log-dashboard.component.css'],
})
export class LogDashboardComponent implements OnInit {
  application: string | undefined = "*";
  applications: { viewValue: string, value: string }[] = [
    { viewValue: "All", value: "*" },
    { viewValue: "CAPTOR", value: "captor" },
    { viewValue: "CDWS", value: "cdws" },
    { viewValue: "DOC0", value: "doc" },
    { viewValue: "GTS", value: "gts" },
    { viewValue: "IMS", value: "ims" },
    { viewValue: "LCM", value: "lcm" },
    { viewValue: "Note", value: "note" },
    { viewValue: "RAR", value: "rar" },
    { viewValue: "REPORTSBATCH", value: "REPORTSBATCH" },
    { viewValue: "VANS", value: "vans" },
  ];
  env: string | undefined = "prod";
  toDatePickerValue: Date = new Date();
  fromDatePickerValue: Date = new Date(Date.now() - 864e5);
  dashBoardType: string | undefined = "chart";
  errorDashboardType: string | undefined = "totErrors";
  isLive = true;
  isLiveChecked: boolean;
  iframeSourceUrl: SafeResourceUrl = '';
  iframeLogSourceUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
    // this.iframeSourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl("");

    this.search(this.isLive);
  }

  search(isLive) {
    this.iframeSourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.getDashboardSrcUrl(isLive));
  }

  toggleBoard(event: MatCheckboxChange) {
    const { checked } = event;
    this.isLive = checked;
    this.search(checked);
  }

  updateSearchParams(event: MatSelectChange) {
    this.search(this.isLive);
  }

  getDashboardSrcUrl(isLive: boolean): string {
    // let partUrl: string;

    // if (this.dashBoardType === "chart") {
    //   partUrl = `(
    //     embeddableConfig:(
    //       timeRange:(from:'${this.fromDatePickerValue.toISOString()}',to:'${this.toDatePickerValue.toISOString()}')
    //     ),
    //     gridData:(h:8,i:'4b770ccd-2cff-422a-a3f3-5350393a8c89',w:12,x:12,y:0),
    //     id:'5a7df240-99e7-11ea-9ddb-05a3689f3e14',
    //     panelIndex:'4b770ccd-2cff-422a-a3f3-5350393a8c89',
    //     type:visualization,version:'7.6.1'
    //   )`
    // }
    // else {
    //   partUrl = "(embeddableConfig:(),gridData:(h:30,i:fab4648a-9bff-45f7-93ee-2bd7c9e6f770,w:48,x:0,y:100),id:a6c58a10-6534-11ea-b305-a30961cbafb1,panelIndex:fab4648a-9bff-45f7-93ee-2bd7c9e6f770,type:search,version:'7.6.1')";
    // }


    const from = isLive ? 'now-15m' : this.fromDatePickerValue.toISOString();
    const to = isLive ? 'now' : (new Date(this.toDatePickerValue.getTime() + 864000)).toISOString();
    const appId = this.dashBoardType === 'chart' ? '6104de00-af43-11ea-b820-3944eb785351' : '3f244530-b008-11ea-b820-3944eb785351';
    const url = `/app/kibana#/dashboard/${appId}?embed=true&_g=(refreshInterval:(pause:!f,value:3000),time:(from:'${from}',to:'${to}'))&_a=(filters:!(),fullScreenMode:!f,options:(hidePanelTitles:!t,useMargins:!t),query:(language:kuery,query:'AppName:%20${this.application || '*'}%20and%20fields.env%20:%20${this.env || '*'}'),timeRestore:!f,viewMode:view)`;

    return `${environment.kibanaUrl}` + url;
  }

  // from home page
  // getLiveDashboardSrcUrl(): string {
  //   return `${environment.kibanaUrl}/app/kibana#/visualize/edit/fd0984e0-6885-11ea-b305-a30961cbafb1?embed=true&_g=(refreshInterval:(pause:!f,value:3000),time:(from:'${(new Date()).toISOString()}',to:now))&_a=(filters:!(),linked:!f,query:(language:kuery,query:''),uiState:(),vis:(aggs:!(),params:(expression:'.es(index%3D*filebeat*,%20timefield%3D!'@timestamp!',%20metric%3D!'cardinality:CORRELATIONID.keyword!')%0D%0A.label(!'Error%20count!')',interval:auto),title:'Timelion%20-%20Errors',type:timelion))`;
  // }

  // getLogDashboardSrcUrl(): string {
  //   return `${environment.kibanaUrl}/app/kibana#/visualize/edit/fd0984e0-6885-11ea-b305-a30961cbafb1?embed=true&_g=(refreshInterval:(pause:!t,value:0),timeRange:(from:'${(new Date(Date.now() - 86400000)).toISOString()}',to:now))&_a=(filters:!(),linked:!f,query:(language:kuery,query:''),uiState:(),vis:(aggs:!(),params:(expression:'.es(index%3D*filebeat*,%20timefield%3D!'@timestamp!',%20metric%3D!'cardinality:CORRELATIONID.keyword!')%0D%0A.label(!'Error%20count!')',interval:auto),title:'Timelion%20-%20Errors',type:timelion))`;
  // }
}
