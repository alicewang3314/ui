import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { MostFrequentExceptionsComponent } from './log-report-module/most-frequent-exceptions/most-frequent-exceptions.component';
import { ExceptionSearchComponent } from './log-report-module/exception-search/exception-search.component';
import { LogDashboardComponent } from './log-report-module/log-dashboard/log-dashboard.component';
//import { MostFrequentErrorsDashbComponent } from './log-report-module/most-frequent-errors-dashb/most-frequent-errors-dashb.component';
//import { LiveErrorLogsComponent } from './log-report-module/live-error-logs/live-error-logs.component';

const routes: Routes = [
  { path: 'tfs-dashboard', loadChildren: () => import('src/app/tfs-reports-module/tfs-reports.module').then(m => m.TfsReportsModule) },
  { path: 'bug-dashboard', loadChildren: () => import('src/app/bug-dashboard-module/bug-dashboard.module').then(m => m.BugDashboardModule) },
  { path: 'error-logs-dashboard', loadChildren: () => import('src/app/log-report-module/log-report.module').then(m => m.LogReportModule) },
  { path: 'log', component: MostFrequentExceptionsComponent },
  { path: 'exceptionSearch', component: ExceptionSearchComponent },
  { path: 'logDashboard', component: LogDashboardComponent },
  {
    path: '**',
    redirectTo: 'error-logs-dashboard',
  },
  // { path: 'mostFrequentDashB', component: MostFrequentErrorsDashbComponent },
  // { path: 'liveErrors', component: LiveErrorLogsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
