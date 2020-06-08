import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { TfsDashboardComponent } from "./tfs-dashboard/tfs-dashboard.component";
import { ProjectDetailsComponent } from "./project-details/project-details.component";
import { ProjectResourceComponent } from "./project-resource/project-resource.component";
import { HomePageComponent } from "./home-page/home-page.component";
//import { IndexPageComponent } from "./index-page/index-page.component";
import { LogReportModule } from './log-report/log-report.module';
import { MostFrequentExceptionsComponent } from './log-report/most-frequent-exceptions/most-frequent-exceptions.component';
import { ExceptionSearchComponent } from './log-report/exception-search/exception-search.component';
import { LogDashboardComponent } from './log-report/log-dashboard/log-dashboard.component';
import { MostFrequentErrorsDashbComponent } from './log-report/most-frequent-errors-dashb/most-frequent-errors-dashb.component';
import { LiveErrorLogsComponent } from './log-report/live-error-logs/live-error-logs.component';
import { TfsDashboardHomeComponent } from './tfs-dashboard-home/tfs-dashboard-home.component';
import { ChangesetReportComponent } from './tfs-reports/changeset-report/changeset-report.component';
import { BugReportComponent } from './tfs-reports/bug-report/bug-report.component';
import { BugChangetReportComponent } from './tfs-reports/bug-changet-report/bug-changet-report.component';
import { BugTagReportComponent } from './tfs-reports/bug-tag-report/bug-tag-report.component';
import { TfsDashboardSettingsComponent } from './settings/tfs-dashboard-settings/tfs-dashboard-settings.component';

//TODO: refactoring clean up
import { ExportReports } from './tfs-reports/export-reports/export-reports.component';

const routes: Routes = [
  //{ path: 'dashboard', component: TfsDashboardComponent },
  // { path: '', redirectTo: '/index', pathMatch:"full" },
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'home',
    component: HomePageComponent
  },
  {
    path: 'tfsDashHome', component: TfsDashboardHomeComponent
  },
  {
    path: 'dashboard/project/:title',
    component: ProjectDetailsComponent
  },
  {
    path: 'dashboard/resourceStats',
    component: ProjectResourceComponent
  },

  { path: 'tfsboard', component: TfsDashboardComponent },
  { path: 'log', component: MostFrequentExceptionsComponent },
  { path: 'exceptionSearch', component: ExceptionSearchComponent },
  { path: 'logDashboard', component: LogDashboardComponent },
  { path: 'mostFrequentDashB', component: MostFrequentErrorsDashbComponent },
  { path: 'liveErrors', component: LiveErrorLogsComponent },
  { path: "changesetReport", component: ChangesetReportComponent },
  { path: "bugReport", component: BugReportComponent },
  { path: "bugChangeSetReport", component: BugChangetReportComponent },
  { path: "bugTagReport", component: BugTagReportComponent },
  { path: "tfsDashSettings", component: TfsDashboardSettingsComponent },
  {
    path: '**',
    component: HomePageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
