import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BugDashboardComponent } from './bug-dashboard/bug-dashbard.component';

const routes: Routes = [
  {
    path: '',
    component: BugDashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BugDashboardRoutingModule { }