import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
// import { TfsDashboardComponent } from "./tfs-dashboard/tfs-dashboard.component";
// import { ProjectDetailsComponent } from "./tfs-reports-module/project-details/project-details.component";
//import { ProjectResourceComponent } from "./tfs-reports-module/project-resource/project-resource.component";
import { HomePageComponent } from "./home-page/home-page.component";
//import { IndexPageComponent } from "./index-page/index-page.component";
import { LogReportModule } from './log-report/log-report.module';
import { MostFrequentExceptionsComponent } from './log-report/most-frequent-exceptions/most-frequent-exceptions.component';
import { ExceptionSearchComponent } from './log-report/exception-search/exception-search.component';
import { LogDashboardComponent } from './log-report/log-dashboard/log-dashboard.component';
import { MostFrequentErrorsDashbComponent } from './log-report/most-frequent-errors-dashb/most-frequent-errors-dashb.component';
import { LiveErrorLogsComponent } from './log-report/live-error-logs/live-error-logs.component';
import { TfsDashboardHomeComponent } from './tfs-dashboard-home/tfs-dashboard-home.component';
// import { ChangesetReportComponent } from './tfs-reports-module/changeset-report/changeset-report.component';
// import { BugReportComponent } from './tfs-reports-module/bug-report/bug-report.component';
// import { BugChangetReportComponent } from './tfs-reports-module/bug-changet-report/bug-changet-report.component';
// import { BugTagReportComponent } from './tfs-reports-module/bug-tag-report/bug-tag-report.component';
// import { TfsDashboardSettingsComponent } from './settings/tfs-dashboard-settings/tfs-dashboard-settings.component';

//TODO: refactoring clean up
// import { ExportReports } from './tfs-reports-module/export-reports/export-reports.component';

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
  // { path: 'tfsboard', component: TfsDashboardComponent },
  { path: 'log', component: MostFrequentExceptionsComponent },
  { path: 'exceptionSearch', component: ExceptionSearchComponent },
  { path: 'logDashboard', component: LogDashboardComponent },
  { path: 'mostFrequentDashB', component: MostFrequentErrorsDashbComponent },
  { path: 'liveErrors', component: LiveErrorLogsComponent },
  // refactoring
  { path: 'tfs-dashboard', loadChildren: () => import('src/app/tfs-reports-module/tfs-reports.module').then(m => m.TfsReportsModule) },
  { path: 'bug-dashboard', loadChildren: () => import('src/app/bug-dashboard-module/bug-dashboard.module').then(m => m.BugDashboardModule) },
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
