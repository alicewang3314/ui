import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from "@angular/material/select";
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { NgxChartsModule } from '@swimlane/ngx-charts';


import { BugDashboardRoutingModule } from './bug-dashboard.routing.module';
import { BugDashboardComponent } from './bug-dashboard/bug-dashbard.component';
import { BugDetailsDialog } from './bug-detail-dialog/bug-detail-dialog.component';
import { BugReportCardComponent } from './bug-report-card/bug-report-card.component';
import { CacheService } from 'src/app/services/cache.service';

@NgModule({
  declarations: [BugDetailsDialog, BugReportCardComponent, BugDashboardComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatSnackBarModule,
    MatSelectModule,
    MatExpansionModule,
    MatCardModule,
    MatDialogModule,
    NgxChartsModule,
    MatGridListModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatCheckboxModule,
    MatIconModule,
    BugDashboardRoutingModule,
  ],
  exports: [
    BugDashboardComponent
  ]
})
export class BugDashboardModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: BugDashboardModule,
      providers: [
        { provide: CacheService }
      ]
    };
  }
}
