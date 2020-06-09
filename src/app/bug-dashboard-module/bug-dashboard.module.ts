import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from "@angular/material/select";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { BugDashboardRoutingModule } from './bug-dashboard.routing.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';

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
    NgxChartsModule,
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
