import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from "@angular/material/select";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';

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
