import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from "@angular/material/select";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatNativeDateModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatTreeModule } from '@angular/material/tree';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ChangesetReportComponent } from './changeset-report/changeset-report.component';
import { BugReportComponent } from './bug-report/bug-report.component';
import { BugTagReportComponent } from './bug-tag-report/bug-tag-report.component';
import { ExportReportsComponent } from './export-reports/export-reports.component';
import { TfsDashboardComponent } from './tfs-dashboard/tfs-dashboard.component';
import { TFSReportCardComponent } from './tfs-report-card/tfs-report-card.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { ProjectResourceComponent } from './project-resource/project-resource.component';
import { ResourceStatisticsComponent } from './resource-statistics/resource-statistics.component';
import { TfsDashboardSettingsComponent } from './tfs-dashboard-settings/tfs-dashboard-settings.component';

import { IterationService } from "src/app/services/iteration.service";
import { IterationReport } from "src/app/dto/iterationReport";
import { CacheService } from "src/app/services/cache.service";
import { SettingService } from 'src/app/services/setting.service';
import { StatusService } from 'src/app/services/status.servie';

import { TFSReportRoutingModule } from './tfs-report.routing.module';

@NgModule({
  declarations: [
    BugReportComponent,
    BugTagReportComponent,
    ChangesetReportComponent,
    ExportReportsComponent,
    ProjectResourceComponent,
    ProjectDetailsComponent,
    ResourceStatisticsComponent,
    TfsDashboardComponent,
    TFSReportCardComponent,
    TfsDashboardSettingsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TFSReportRoutingModule,
    // Materials
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatSnackBarModule,
    MatSelectModule,
    MatExpansionModule,
    MatTableModule,
    MatTabsModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatDialogModule,
    MatNativeDateModule,
    MatGridListModule,
    MatListModule,
    MatCheckboxModule,
    MatSortModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatPaginatorModule,
    MatRadioModule,
    MatTreeModule,
    FontAwesomeModule,
  ],
  exports: [
    BugReportComponent,
    TfsDashboardComponent,
  ]
})
export class TfsReportsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: TfsReportsModule,
      providers: [
        { provide: IterationService },
        { provide: IterationReport },
        { provide: CacheService },
        { provide: SettingService },
        { provide: StatusService },
      ]
    }
  }
}
