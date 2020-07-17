import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExceptionSearchComponent } from './exception-search/exception-search.component';
import { LogDashboardComponent } from './log-dashboard/log-dashboard.component';
import { MostFrequentErrorsDashbComponent } from './most-frequent-errors-dashb/most-frequent-errors-dashb.component';
import { MostFrequentExceptionsComponent } from './most-frequent-exceptions/most-frequent-exceptions.component';

const routes: Routes = [
  {
    path: '',
    component: LogDashboardComponent,
  },
  {
    path: 'exceptions-search',
    component: ExceptionSearchComponent,
  },
  {
    path: 'log',
    component: MostFrequentExceptionsComponent,
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