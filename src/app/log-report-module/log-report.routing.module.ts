import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LogDashboardComponent } from './log-dashboard/log-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: LogDashboardComponent,
  },
  {
    path: '*',
    redirectTo: '',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LogReportRoutingModule { }