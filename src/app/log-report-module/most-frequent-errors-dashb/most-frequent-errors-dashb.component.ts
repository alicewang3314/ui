import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-most-frequent-errors-dashb',
  templateUrl: './most-frequent-errors-dashb.component.html',
  styleUrls: ['./most-frequent-errors-dashb.component.css']
})
export class MostFrequentErrorsDashbComponent implements OnInit {

  constructor(private sanitizer: DomSanitizer) { }

  application = "rar";
  sourceUrl: SafeResourceUrl;
  isButtonClicked: boolean = false;

  ngOnInit() {
  }

  changeUrl() {
    this.isButtonClicked = true;
    this.sourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(environment.kibanaUrl + "/app/kibana#/dashboard/9eca3600-648d-11ea-b305-a30961cbafb1?"
      + "embed=true&_g=(filters:!(),refreshInterval:(pause:!t,value:0),time:(from:now-90d,to:now))&"
      + "_a=(description:'',filters:!(),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),"
      + "panels:!((embeddableConfig:(),gridData:(h:26,i:'8e82bcfa-ee13-4def-8de3-e23d4b31460e',w:46,x:0,y:0),"
      + "id:'84fe0df0-648d-11ea-b305-a30961cbafb1',panelIndex:'8e82bcfa-ee13-4def-8de3-e23d4b31460e',type:visualization,"
      + "version:'7.6.1')),query:(language:kuery,query:'AppName%20:%20" + this.application + "')"
      + ",timeRestore:!f,title:'Dashboard%20Frequent%20Errors%202',viewMode:view)");
  }

  resizeIframe(obj) {
    obj.style.height = obj.contentWindow.document.documentElement.scrollHeight + 250 + 'px';
  }
}
