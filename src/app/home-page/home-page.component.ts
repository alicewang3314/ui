import { Component, OnInit, AfterViewInit, ViewEncapsulation, Inject, ViewChild } from "@angular/core";
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { IterationService } from '../services/iteration.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CacheService } from '../services/cache.service';
import { FormControl } from '@angular/forms';
import { BarHorizontalComponent, BaseChartComponent } from '@swimlane/ngx-charts';
import * as _ from 'lodash';
//TODO: remove dev setting
import { rawBugReport } from 'src/app/mock';

// refactoring
import { BugReportCard } from 'src/app/types';


export class Project {
  Name: string;
}

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.css"],
  encapsulation: ViewEncapsulation.None
})
export class HomePageComponent implements OnInit {

  ////////////// ---------old code-------------////////////////
  iframeLiveLogSourceUrl: SafeResourceUrl;
  iframeLogSourceUrl: SafeResourceUrl;
  @ViewChild('chart1') chart1: BaseChartComponent;
  @ViewChild('chart2') chart2: BaseChartComponent;
  @ViewChild('chart3') chart3: BaseChartComponent;

  respBugApi: any[];
  bugsActResCnt: any;
  bugGrpCnt: ({ name: string, value: number }[]);
  seriesData: ({ name: string, value: number }[]);
  bugStackCnt: ({ name: string, series: ({ name: string, value: number }[]) }[]);
  bugSeverityCnt: ({ name: string, series: ({ name: string, value: number }[]) }[]);
  view: any[] = [700, 400];

  //chart options

  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = false;
  xAxisLabel = 'Count';
  showYAxisLabel = true;
  showGridLines = true;
  yAxisLabel = '';
  selectedTabIndex = new FormControl(0);
  ///////////// ---------old code-------------//////////////////////

  filteredBugDetails: any;
  selectedSeverity: any = 'all';

  donutData: any = [];

  donutColorScheme = {
    domain: ['#66a3ff', '#40E0D0', '#98FB98', '#4dff4d', '#C71585', '#DB7093', '#FFC0CB', '#ffd11a', '#ffe680', '#944dff', '#cc66ff', '#4B0082', '#FFA500']
  };

  stackColorScheme = {
    domain: ['#ff1a1a', '#ffaa00', '#eff623', '#4da6ff']
  };

  displayedColumns: string[] = ['id', 'title', 'severity', 'createdBy', 'createdDate'];
  donutChartLevel: number = 0;


  // ================ refactoring
  totalBugs: BugReportCard = {
    title: 'Total Bugs',
    total: 0,
    resolved: 0,
    active: 0
  };
  criticalBugs: BugReportCard = {
    title: '1 - Critical Bugs',
    total: 0,
    resolved: 0,
    active: 0
  };
  highBugs: BugReportCard = {
    title: '2 - High Bugs',
    total: 0,
    resolved: 0,
    active: 0
  };
  mediumBugs: BugReportCard = {
    title: '3 - Medium Bugs',
    total: 0,
    resolved: 0,
    active: 0
  };
  lowBugs: BugReportCard = {
    title: '4 - Low Bugs',
    total: 0,
    resolved: 0,
    active: 0
  };


  constructor(
    private sanitizer: DomSanitizer,
    private iterationService: IterationService,
    private cacheService: CacheService,
    public dialog: MatDialog) {
  }

  ngOnInit() {
    this.selectedTabIndex.setValue(this.cacheService.selectHomeTabIndex);

    this.iframeLiveLogSourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.getLiveDashboardSrcUrl());
    this.iframeLogSourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.getLogDashboardSrcUrl());

    // this.cacheService.getBugsDashboardData().subscribe(
    //   resp => {
    //     console.log(`>>>>>>>>>`, JSON.stringify(resp));
    //     this.respBugApi = resp;
    //     this.getBugReportsData(resp);
    //     this.calculateCardData(resp);
    //     this.getDonutChartData(resp);
    //     this.calculateStackData(resp);
    //   });

    // TODO: remove local dev setup
    this.respBugApi = rawBugReport;
    console.log(rawBugReport);
    this.getBugReportsData(rawBugReport);
    this.calculateCardData(rawBugReport);
    this.getDonutChartData(rawBugReport);
    this.calculateStackData(rawBugReport);
  }

  selectedAreaPath: any;
  reloadBugDetails(event) {
    let self = this;
    self.selectedAreaPath = event.name;
    if (this.selectedSeverity !== 'all')
      this.filteredBugDetails = _.filter(self.respBugApi, function (o) { return o.areaPath == event.name && o.severity == self.selectedSeverity });
    else
      this.filteredBugDetails = _.filter(self.respBugApi, function (o) { return o.areaPath == event.name });
  }

  getDonutChartData(bugsReport: any[]) {
    const donutData = [];
    const activeIssues = bugsReport.filter(report => report.state === 'Active');
    const issueGroupedByProject = _.groupBy(activeIssues, 'areaPath');

    for (const [project, issues] of Object.entries(issueGroupedByProject)) {
      project && donutData.push({
        name: project,
        value: issues.length
      })
    }

    this.donutData = donutData;
  }

  calculateCardData(total: any[]) {
    const filter = (root: any, prop: string, rule: string): any[] => root.filter(i => i[prop] === rule);

    const resolved = filter(total, 'state', 'Resolved');
    const active = filter(total, 'state', 'Active');
    Object.assign(this.totalBugs, {
      total: total.length,
      resolved: resolved.length,
      active: active.length,
    });
    Object.assign(this.criticalBugs, {
      total: filter(total, 'severity', '1 - Critical').length,
      resolved: filter(resolved, 'severity', '1 - Critical').length,
      active: filter(active, 'severity', '1 - Critical').length,
    });
    Object.assign(this.highBugs, {
      total: filter(total, 'severity', '2 - High').length,
      resolved: filter(resolved, 'severity', '2 - High').length,
      active: filter(active, 'severity', '2 - High').length,
    });
    Object.assign(this.mediumBugs, {
      total: filter(total, 'severity', '3 - Medium').length,
      resolved: filter(resolved, 'severity', '3 - Medium').length,
      active: filter(active, 'severity', '3 - Medium').length,
    });
    Object.assign(this.lowBugs, {
      total: filter(total, 'severity', '4 - Low').length,
      resolved: filter(resolved, 'severity', '4 - Low').length,
      active: filter(active, 'severity', '4 - Low').length,
    });
  }

  calculateStackData(bugReport: any[]) {
    const bugsBreakdown = [];
    const activeIssues = bugReport.filter(({ state }) => state === 'Active');
    const issueGroupedByProject = _.groupBy(activeIssues, 'areaPath');
    const severities = ['1 - Critical', '2 - High', '3 - Medium', '4 - Low'];

    for (const [project, issues] of Object.entries(issueGroupedByProject)) {
      const issuesGroupedBySeverity = _.groupBy(issues, 'severity');
      const series = [];

      severities.forEach(severity => {
        series.push({
          name: severity,
          value: issuesGroupedBySeverity[severity] && issuesGroupedBySeverity[severity].length || 0
        });
      });

      bugsBreakdown.push({
        name: project,
        series
      })
    }
    this.bugStackCnt = bugsBreakdown;
  };

  onBugDropdownChange(event) {
    // todo: why resign to self?
    let self = this;
    self.selectedSeverity = event.value;

    self.filteredBugDetails = self.selectedSeverity !== 'all' ?
      (self.selectedAreaPath ?
        self.respBugApi.filter(i => i.areaPath == self.selectedAreaPath && i.severity == self.selectedSeverity) :
        self.respBugApi.filter(i => i.severity == self.selectedSeverity)
      ) :
      self.respBugApi;
  };

  // openDialogBugsApp(e): void {
  //   var apps = this.respBugApi.filter(resp => {
  //     let appNames = resp.areaPath.split('\\');
  //     return (appNames[appNames.length - 1] == (e.name))
  //   });

  //   this.dialog.open(BugDetailsDialog, {
  //     width: '700px',
  //     height: 'auto',
  //     data: {
  //       apps: apps, title: e.name
  //     }
  //   });
  // }

  // openDialogBugsActRes(e) {
  //   var apps = this.respBugApi.filter(resp =>
  //     resp.state === e.name
  //   );

  //   this.dialog.open(BugDetailsDialog, {
  //     width: '700px',
  //     height: 'auto',
  //     data: {
  //       apps: apps, title: e.name
  //     }
  //   });
  // }

  // openDialogBugsSev(e) {
  //   var apps = this.respBugApi.filter(resp =>
  //     resp.state === e.name && resp.severity === e.series
  //   );

  //   this.dialog.open(BugDetailsDialog, {
  //     width: '700px',
  //     height: 'auto',
  //     data: {
  //       apps: apps, title: e.name + ' | ' + e.series
  //     }
  //   });
  // }

  /**
   *
   */
  calculateBugsAppCnt(bugsReport: any[]) {
    const groupedIssueByProject = _.groupBy(bugsReport, 'areaPath');
    const countByProject = [];

    for (const [name, issues] of Object.entries(groupedIssueByProject)) {
      countByProject.push({
        name,
        value: issues.length
      });
    }

    this.bugGrpCnt = countByProject.sort((a, b) => a.value - b.value);
  }

  calculateBugsActResCnt(bugsReport: any[]) {
    const issueGroupedByStatus = _.groupBy(bugsReport, 'status');
    const countByStatus = [];

    for (const [name, issues] of Object.entries(issueGroupedByStatus)) {
      countByStatus.push({
        name,
        value: issues.length
      });
    }

    this.bugsActResCnt = countByStatus;
  }

  calculateBugsSeverityCnt(bugsReport: any[]) {
    const groupedIssueBySeverity = _.groupBy(bugsReport, 'severity');
    let formattedGroupedIssueByState;
    const formattedGroupedIssueByServerity = [];

    for (const [serverity, issues] of Object.entries(groupedIssueBySeverity)) {
      const groupedByStatus = _.groupBy(issues, 'state');
      formattedGroupedIssueByState = [];

      for (const [state, issues] of Object.entries(groupedByStatus)) {
        formattedGroupedIssueByState.push({
          name: state,
          value: issues.length
        });
      }

      formattedGroupedIssueByServerity.push({
        name: serverity,
        series: formattedGroupedIssueByState
      });
    }
    this.bugSeverityCnt = formattedGroupedIssueByServerity;
  }

  getLiveDashboardSrcUrl(): string {

    return `${environment.kibanaUrl}/app/kibana#/visualize/edit/fd0984e0-6885-11ea-b305-a30961cbafb1?embed=true&_g=(refreshInterval:(pause:!f,value:3000),time:(from:'${(new Date()).toISOString()}',to:now))&_a=(filters:!(),linked:!f,query:(language:kuery,query:''),uiState:(),vis:(aggs:!(),params:(expression:'.es(index%3D*filebeat*,%20timefield%3D!'@timestamp!',%20metric%3D!'cardinality:CORRELATIONID.keyword!')%0D%0A.label(!'Error%20count!')',interval:auto),title:'Timelion%20-%20Errors',type:timelion))`;
  }

  getLogDashboardSrcUrl(): string {

    return `${environment.kibanaUrl}/app/kibana#/visualize/edit/fd0984e0-6885-11ea-b305-a30961cbafb1?embed=true&_g=(refreshInterval:(pause:!t,value:0),time:(from:'${(new Date(Date.now() - 86400000)).toISOString()}',to:now))&_a=(filters:!(),linked:!f,query:(language:kuery,query:''),uiState:(),vis:(aggs:!(),params:(expression:'.es(index%3D*filebeat*,%20timefield%3D!'@timestamp!',%20metric%3D!'cardinality:CORRELATIONID.keyword!')%0D%0A.label(!'Error%20count!')',interval:auto),title:'Timelion%20-%20Errors',type:timelion))`;
  }

  onTabChange(index: number) {
    this.cacheService.selectHomeTabIndex = index;
    this.chart1.update();
    this.chart2.update();
    // this.chart3.update();
  }

  clearBugsDashboard() {
    this.cacheService.clearBugsCache();
    // todo: Do we need this? since src data change will cause reinit
    // this.cacheService.getBugsDashboardData().subscribe(
    //   resp => {
    //     this.respBugApi = resp;
    //     //prepare data for chart
    //     // this.calculateBugsAppCnt(this.respBugApi);
    //     // this.calculateBugsActResCnt(this.respBugApi);
    //     // this.calculateBugsSeverityCnt(this.respBugApi);
    //     this.getBugReportsData(resp);
    //   });
  }

  getBugReportsData(temp) {
    this.calculateBugsAppCnt(temp);
    this.calculateBugsActResCnt(temp);
    this.calculateBugsSeverityCnt(temp);
  }
}

// @Component({
//   selector: 'bug-details-dialog',
//   templateUrl: 'bug-details-dialog.html',
// })

// export class BugDetailsDialog {

//   constructor(
//     public dialogRef: MatDialogRef<BugDetailsDialog>,
//     @Inject(MAT_DIALOG_DATA) public data: any) { }

//   onCloseClick(): void {
//     this.dialogRef.close();
//   }

// }