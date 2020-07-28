import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExportReportsComponent } from './export-reports/export-reports.component';
import { TfsDashboardComponent } from './tfs-dashboard/tfs-dashboard.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { ProjectResourceComponent } from './project-resource/project-resource.component';
import { TfsDashboardSettingsComponent } from './tfs-dashboard-settings/tfs-dashboard-settings.component';

const routes: Routes = [
  {
    path: '',
    component: TfsDashboardComponent
  },
  {
    path: 'export',
    component: ExportReportsComponent
  },
  {
    path: 'settings',
    component: TfsDashboardSettingsComponent,
  },
  {
    path: 'project/:title',
    component: ProjectDetailsComponent
  },
  {
    path: 'resource-stats',
    component: ProjectResourceComponent
  },
    {
    path: '*',
    component: TfsDashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TFSReportRoutingModule { }