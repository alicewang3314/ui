import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as _ from 'lodash';
import { MatDialog } from '@angular/material/dialog';

import { BugReportCard } from 'src/app/types';
import { CacheService } from 'src/app/services/cache.service';
import { BugDashboardService } from '../bug-dashboard.service';

// TODO: remove dev setup
// import { rawBugReport } from 'src/app/mock';

@Component({
  selector: 'bug-dashboard',
  templateUrl: './bug-dashboard.component.html',
  styleUrls: ['./bug-dashboard.component.css']
})
export class BugDashboardComponent {
  respBugApi: any[];
  bugsActResCnt: any;
  bugStackCnt: ({ name: string, series: ({ name: string, value: number }[]) }[]);
  selectedAreaPath: any;
  bugSeverityCnt: ({ name: string, series: ({ name: string, value: number }[]) }[]);
  bugGrpCnt: ({ name: string, value: number }[]);

  // chart options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = false;
  xAxisLabel = 'Count';
  showYAxisLabel = true;
  yAxisLabel = '';
  selectedTabIndex = 0;
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
    private service: BugDashboardService,
    public dialog: MatDialog,
    private cache: CacheService,
  ) { }

  ngOnInit() {
    this.service.getBugReport().subscribe((resp: any[]) => {
      this.respBugApi = resp;
      this.getBugReportsData(resp);
      this.calculateCardData(resp);
      this.getDonutChartData(resp);
      this.calculateStackData(resp);
    });

    // TODO: remove local dev setup
    // this.respBugApi = rawBugReport;
    // console.log(rawBugReport);
    // this.getBugReportsData(rawBugReport);
    // this.calculateCardData(rawBugReport);
    // this.getDonutChartData(rawBugReport);
    // this.calculateStackData(rawBugReport);
  }

  getBugReportsData(temp) {
    this.calculateBugsAppCnt(temp);
    this.calculateBugsActResCnt(temp);
    this.calculateBugsSeverityCnt(temp);
  }

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
    console.log(total);

    const filter = (root: any, prop: string, rule: string): any[] => root.filter(i => i[prop] === rule);

    const resolved = filter(total, 'state', 'Resolved');
    const proposed = filter(total, 'state', 'Proposed');
    const active = filter(total, 'state', 'Active');

    Object.assign(this.totalBugs, {
      total: total.length,
      resolved: resolved.length,
      active: active.length + proposed.length,
    });
    Object.assign(this.criticalBugs, {
      total: filter(total, 'severity', '1 - Critical').length,
      resolved: filter(resolved, 'severity', '1 - Critical').length,
      active: filter(active, 'severity', '1 - Critical').length + filter(proposed, 'severity', '1 - Critical').length,
    });
    Object.assign(this.highBugs, {
      total: filter(total, 'severity', '2 - High').length,
      resolved: filter(resolved, 'severity', '2 - High').length,
      active: filter(active, 'severity', '2 - High').length + filter(proposed, 'severity', '2 - High').length,
    });
    Object.assign(this.mediumBugs, {
      total: filter(total, 'severity', '3 - Medium').length,
      resolved: filter(resolved, 'severity', '3 - Medium').length,
      active: filter(active, 'severity', '3 - Medium').length + filter(proposed, 'severity', '3 - Medium').length,
    });

    Object.assign(this.lowBugs, {
      total: filter(total, 'severity', '4 - Low').length,
      resolved: filter(resolved, 'severity', '4 - Low').length,
      active: filter(active, 'severity', '4 - Low').length + filter(proposed, 'severity', '4 - Low').length,
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
    let self = this;
    self.selectedSeverity = event.value;

    self.filteredBugDetails = self.selectedSeverity !== 'all' ?
      (self.selectedAreaPath ?
        self.respBugApi.filter(i => i.areaPath == self.selectedAreaPath && i.severity == self.selectedSeverity) :
        self.respBugApi.filter(i => i.severity == self.selectedSeverity)
      ) :
      self.respBugApi;
  };

  calculateBugsAppCnt(bugsReport: any[]) {
    const groupedIssueByProject = _.groupBy(bugsReport, 'areaPath');
    const countByProject = [];

    for (const [name, issues] of Object.entries(groupedIssueByProject)) {
      countByProject.push({
        name,
        value: issues.length
      });
    }

    // this.bugGrpCnt = countByProject.sort((a, b) => a.value - b.value);
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

  getTfsUrl(id) {
    return `https://tfs.py.pa.gov/tfs/DefaultCollection_DOC/CAPTOR/_workitems?id=${id}&fullScreen=true&_a=edit`;
  }
}