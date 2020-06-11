import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomePageComponent } from "./home-page/home-page.component";
import { LogReportModule } from './log-report/log-report.module';
import { MostFrequentExceptionsComponent } from './log-report/most-frequent-exceptions/most-frequent-exceptions.component';
import { ExceptionSearchComponent } from './log-report/exception-search/exception-search.component';
import { LogDashboardComponent } from './log-report/log-dashboard/log-dashboard.component';
import { MostFrequentErrorsDashbComponent } from './log-report/most-frequent-errors-dashb/most-frequent-errors-dashb.component';
import { LiveErrorLogsComponent } from './log-report/live-error-logs/live-error-logs.component';

const routes: Routes = [
  { path: 'tfs-dashboard', loadChildren: () => import('src/app/tfs-reports-module/tfs-reports.module').then(m => m.TfsReportsModule) },
  { path: 'bug-dashboard', loadChildren: () => import('src/app/bug-dashboard-module/bug-dashboard.module').then(m => m.BugDashboardModule) },
  { path: 'log', component: MostFrequentExceptionsComponent },
  { path: 'exceptionSearch', component: ExceptionSearchComponent },
  { path: 'logDashboard', component: LogDashboardComponent },
  { path: 'mostFrequentDashB', component: MostFrequentErrorsDashbComponent },
  { path: 'liveErrors', component: LiveErrorLogsComponent },
  {
    path: '*',
    redirectTo: 'tfs-dashboard'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
