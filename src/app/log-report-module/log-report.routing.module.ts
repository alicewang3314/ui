import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LogDashboardComponent } from './log-dashboard/log-dashboard.component';
import { MostFrequentErrorsDashbComponent } from './most-frequent-errors-dashb/most-frequent-errors-dashb.component';

const routes: Routes = [
  {
    path: '',
    component: LogDashboardComponent,
  },
  {
    path: 'errors',
    component: MostFrequentErrorsDashbComponent,
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