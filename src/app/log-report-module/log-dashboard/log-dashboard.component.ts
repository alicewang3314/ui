import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
// import {} from '../kibana-config'

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

  isLive: boolean;
  isLiveChecked: boolean;
  iframeSourceUrl: SafeResourceUrl = '';
  iframeLogSourceUrl: SafeResourceUrl;


  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
    // this.iframeSourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl("");

    this.search();
  }

  search() {
    this.iframeSourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.getDashboardSrcUrl());
  }

  getLiveDashboardSrcUrl(): string {
    let partUrl: string = "";

    if (this.dashBoardType === "chart") {
      if (this.errorDashboardType === "totErrors") {
        // TODO: handle error
      }
      partUrl = "(embeddableConfig:(),gridData:(h:15,i:feb5c6f7-aac6-477a-87c3-e7cb9e637e87,w:24,x:0,y:0),id:fbadfea0-63c6-11ea-9f43-d5197eb32b78,panelIndex:feb5c6f7-aac6-477a-87c3-e7cb9e637e87,type:visualization,version:'7.6.1'),(embeddableConfig:(),gridData:(h:15,i:'79bf8ecb-751c-433e-98c4-86b0423dbe5f',w:24,x:24,y:0),id:'1444e200-685c-11ea-b305-a30961cbafb1',panelIndex:'79bf8ecb-751c-433e-98c4-86b0423dbe5f',type:visualization,version:'7.6.1'),(embeddableConfig:(),gridData:(h:9,i:'3ddd5a40-5c81-4856-aebe-2d606d371446',w:48,x:0,y:15),id:fd0984e0-6885-11ea-b305-a30961cbafb1,panelIndex:'3ddd5a40-5c81-4856-aebe-2d606d371446',type:visualization,version:'7.6.1')";
    }
    else {
      partUrl = "(embeddableConfig:(),gridData:(h:25,i:fab4648a-9bff-45f7-93ee-2bd7c9e6f770,w:48,x:0,y:24),id:a6c58a10-6534-11ea-b305-a30961cbafb1,panelIndex:fab4648a-9bff-45f7-93ee-2bd7c9e6f770,type:search,version:'7.6.1')";
    }

    return `${environment.kibanaUrl}/app/kibana#/dashboard/0404fd90-685b-11ea-b305-a30961cbafb1?embed=true&_g=(refreshInterval:(pause:!f,value:3000),time:(from:'${(new Date()).toISOString()}',to:now))&_a=(description:'',filters:!(),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),panels:!(${partUrl}),query:(language:kuery,query:'AppName:%20${this.application ? this.application : "*"}%20and%20fields.env%20:%20${this.env ? this.env : "*"}'),timeRestore:!f,title:'Captor%20Log%20Dashboard%20-%20Bar',viewMode:view)`;
  }

  getDashboardSrcUrl(): string {
    let partUrl: string = "";
    const date = new Date();

    if (this.dashBoardType === "chart") {
      partUrl = `(
        embeddableConfig:(
          timeRange:(from:'${this.fromDatePickerValue.toISOString()}',to:'${this.toDatePickerValue.toISOString()}')
        ),
        gridData:(h:8,i:'4b770ccd-2cff-422a-a3f3-5350393a8c89',w:12,x:12,y:0),
        id:'5a7df240-99e7-11ea-9ddb-05a3689f3e14',
        panelIndex:'4b770ccd-2cff-422a-a3f3-5350393a8c89',
        type:visualization,version:'7.6.1'
      )`
    }
    else {
      partUrl = "(embeddableConfig:(),gridData:(h:30,i:fab4648a-9bff-45f7-93ee-2bd7c9e6f770,w:48,x:0,y:100),id:a6c58a10-6534-11ea-b305-a30961cbafb1,panelIndex:fab4648a-9bff-45f7-93ee-2bd7c9e6f770,type:search,version:'7.6.1')";
    }

    return `${environment.kibanaUrl}/app/kibana#/dashboard/6535acb0-9919-11ea-9ddb-05a3689f3e14?embed=true&_g=(refreshInterval:(pause:!f,value:3000),time:(from:'${(new Date()).toISOString()}',to:now))&_a=(description:'',filters:!(),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),panels:!(${partUrl}),query:(language:kuery,query:'AppName:%20${this.application ? this.application : "*"}%20and%20fields.env%20:%20${this.env ? this.env : "*"}'),timeRestore:!f,title:'Captor%20Log%20Dashboard%20-%20Bar%20Modified',viewMode:view)`
  }

  // from home page
  // getLiveDashboardSrcUrl(): string {
  //   return `${environment.kibanaUrl}/app/kibana#/visualize/edit/fd0984e0-6885-11ea-b305-a30961cbafb1?embed=true&_g=(refreshInterval:(pause:!f,value:3000),time:(from:'${(new Date()).toISOString()}',to:now))&_a=(filters:!(),linked:!f,query:(language:kuery,query:''),uiState:(),vis:(aggs:!(),params:(expression:'.es(index%3D*filebeat*,%20timefield%3D!'@timestamp!',%20metric%3D!'cardinality:CORRELATIONID.keyword!')%0D%0A.label(!'Error%20count!')',interval:auto),title:'Timelion%20-%20Errors',type:timelion))`;
  // }

  getLogDashboardSrcUrl(): string {
    return `${environment.kibanaUrl}/app/kibana#/visualize/edit/fd0984e0-6885-11ea-b305-a30961cbafb1?embed=true&_g=(refreshInterval:(pause:!t,value:0),time:(from:'${(new Date(Date.now() - 86400000)).toISOString()}',to:now))&_a=(filters:!(),linked:!f,query:(language:kuery,query:''),uiState:(),vis:(aggs:!(),params:(expression:'.es(index%3D*filebeat*,%20timefield%3D!'@timestamp!',%20metric%3D!'cardinality:CORRELATIONID.keyword!')%0D%0A.label(!'Error%20count!')',interval:auto),title:'Timelion%20-%20Errors',type:timelion))`;
  }

  resize(iframe) {
    iframe.style.height = iframe.contentWindow.document.documentElement.scrollHeight + 'px';
  }
}
