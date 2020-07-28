import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  { path: 'tfs-dashboard', loadChildren: () => import('src/app/tfs-reports-module/tfs-reports.module').then(m => m.TfsReportsModule) },
  { path: 'bug-dashboard', loadChildren: () => import('src/app/bug-dashboard-module/bug-dashboard.module').then(m => m.BugDashboardModule) },
  { path: 'error-logs-dashboard', loadChildren: () => import('src/app/log-report-module/log-report.module').then(m => m.LogReportModule) },
  {
    path: '**',
    redirectTo: 'error-logs-dashboard',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
