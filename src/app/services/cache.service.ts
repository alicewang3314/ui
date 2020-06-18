import { Injectable } from "@angular/core";
import { IterationService } from "./iteration.service";
import { IterationReport } from "../dto/iterationReport";
import { Observable, } from "rxjs";
import { map, publishReplay, refCount } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class CacheService {
  iterationReport: IterationReport;
  observableIteration: Observable<IterationReport>;
  data: any;
  singleDetails: any;
  allPendingReport: IterationReport;
  observableAllPending: Observable<IterationReport>;
  observableBugsDashboardData: Observable<any>;
  noResult: any;
  selectedTabIndex: number = 0;
  checkedList: any;
  missingValue: any;

  constructor(private iterationService: IterationService) { }

  getIterationReportOld(data: any): Observable<IterationReport> {
    this.observableIteration = this.iterationService.getCurrent(data).pipe(
      map(val => {
        this.observableIteration = null;
        if (val == null) {
          this.iterationReport = val;
          return this.iterationReport;
        } else {
          this.iterationReport = val;
          return this.iterationReport;
        }
      })
    );

    return this.observableIteration;
  }

  getAllPendingReportOld(data: any): Observable<IterationReport> {
    this.observableAllPending = this.iterationService.getAllPending(data).pipe(
      map(val => {
        this.observableAllPending = null;
        this.allPendingReport = val;
        return this.allPendingReport;
      })
    );
    
    return this.observableAllPending;
  }

  getIterationReport(data: any): Observable<IterationReport> {

    if (!this.observableIteration) {
      this.observableIteration = this.iterationService.getCurrent2(data)
        .pipe(
          publishReplay(1),
          refCount()
        );
    }

    return this.observableIteration;
  }

  getAllPendingReport(data: any): Observable<IterationReport> {

    if (!this.observableAllPending) {

      this.observableAllPending = this.iterationService.getAllPending2(data).pipe(
        publishReplay(1),
        refCount()
      );
    }

    return this.observableAllPending;
  }

  getBugsDashboardData() {

    if (!this.observableBugsDashboardData) {
      this.observableBugsDashboardData = this.iterationService.getBugsForDashboard().pipe(
        publishReplay(1),
        refCount()
      );
    }

    return this.observableBugsDashboardData;
  }

  clearCache() {
    this.observableAllPending = null;
    this.observableIteration = null;
  }

  clearBugsCache() {
    this.observableBugsDashboardData = null;
  }
}
