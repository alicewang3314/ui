import { Component, OnInit, OnDestroy } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { environment } from "src/environments/environment";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-live-error-logs',
  templateUrl: './live-error-logs.component.html',
  styleUrls: ['./live-error-logs.component.css']
})
export class LiveErrorLogsComponent implements OnInit, OnDestroy {
  application: string | undefined;
  applications: { viewValue: string, value: string }[];
  env: string | undefined;
  iframeSourceUrl: SafeResourceUrl;
  dashBoardType: string | undefined;

  constructor(private sanitizer: DomSanitizer, private _snackBar: MatSnackBar) { }

  ngOnDestroy(): void {
    this.hideNotification();
  }

  hideNotification() {
    this._snackBar.dismiss();
  }

  ngOnInit() {
    this.env = "prod";
    this.application = "*";
    this.applications = [     
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
    this.dashBoardType = "chart";
    this.iframeSourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl("");
  }

  getLiveDashboardSrcUrl(): string {

    let partUrl: string = "";

    if (this.dashBoardType === "chart") {
      partUrl = "(embeddableConfig:(),gridData:(h:15,i:feb5c6f7-aac6-477a-87c3-e7cb9e637e87,w:24,x:0,y:0),id:fbadfea0-63c6-11ea-9f43-d5197eb32b78,panelIndex:feb5c6f7-aac6-477a-87c3-e7cb9e637e87,type:visualization,version:'7.6.1'),(embeddableConfig:(),gridData:(h:15,i:'79bf8ecb-751c-433e-98c4-86b0423dbe5f',w:24,x:24,y:0),id:'1444e200-685c-11ea-b305-a30961cbafb1',panelIndex:'79bf8ecb-751c-433e-98c4-86b0423dbe5f',type:visualization,version:'7.6.1'),(embeddableConfig:(),gridData:(h:9,i:'3ddd5a40-5c81-4856-aebe-2d606d371446',w:48,x:0,y:15),id:fd0984e0-6885-11ea-b305-a30961cbafb1,panelIndex:'3ddd5a40-5c81-4856-aebe-2d606d371446',type:visualization,version:'7.6.1')";
    }
    else {
      partUrl = "(embeddableConfig:(),gridData:(h:25,i:fab4648a-9bff-45f7-93ee-2bd7c9e6f770,w:48,x:0,y:24),id:a6c58a10-6534-11ea-b305-a30961cbafb1,panelIndex:fab4648a-9bff-45f7-93ee-2bd7c9e6f770,type:search,version:'7.6.1')";
    }
    //return `${environment.kibanaUrl}/app/kibana#/dashboard/0404fd90-685b-11ea-b305-a30961cbafb1?embed=true&_g=(refreshInterval:(pause:!f,value:3000),time:(from:'${(new Date()).toISOString()}',to:now))&_a=(description:'',filters:!(),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),panels:!((embeddableConfig:(),gridData:(h:15,i:feb5c6f7-aac6-477a-87c3-e7cb9e637e87,w:24,x:0,y:0),id:fbadfea0-63c6-11ea-9f43-d5197eb32b78,panelIndex:feb5c6f7-aac6-477a-87c3-e7cb9e637e87,type:visualization,version:'7.6.1'),(embeddableConfig:(),gridData:(h:15,i:'79bf8ecb-751c-433e-98c4-86b0423dbe5f',w:24,x:24,y:0),id:'1444e200-685c-11ea-b305-a30961cbafb1',panelIndex:'79bf8ecb-751c-433e-98c4-86b0423dbe5f',type:visualization,version:'7.6.1'),(embeddableConfig:(),gridData:(h:9,i:'3ddd5a40-5c81-4856-aebe-2d606d371446',w:48,x:0,y:15),id:fd0984e0-6885-11ea-b305-a30961cbafb1,panelIndex:'3ddd5a40-5c81-4856-aebe-2d606d371446',type:visualization,version:'7.6.1')),query:(language:kuery,query:'AppName:%20${this.application ? this.application : "*"}%20and%20fields.env%20:%20${this.env ? this.env : "*"}'),timeRestore:!f,title:'Captor%20Log%20Dashboard%20-%20Bar',viewMode:view)`;
    return `${environment.kibanaUrl}/app/kibana#/dashboard/0404fd90-685b-11ea-b305-a30961cbafb1?embed=true&_g=(refreshInterval:(pause:!f,value:3000),time:(from:'${(new Date()).toISOString()}',to:now))&_a=(description:'',filters:!(),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),panels:!(${partUrl}),query:(language:kuery,query:'AppName:%20${this.application ? this.application : "*"}%20and%20fields.env%20:%20${this.env ? this.env : "*"}'),timeRestore:!f,title:'Captor%20Log%20Dashboard%20-%20Bar',viewMode:view)`;
  }

  search() {
    this._snackBar.open(`📣 Showing Live Results for Env: ${this.env == undefined ? "All" : this.env}, App: ${this.application == "*" ? "All" : this.application} `, "", {
      verticalPosition: "top",
      horizontalPosition: "right",
      duration: 0,
    });

    this.iframeSourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.getLiveDashboardSrcUrl());
  }
}
