import { Injectable } from "@angular/core";
import { IterationService } from "./iteration.service";
import { IterationReport } from "../dto/iterationReport";
import { Observable, } from "rxjs";
import { publishReplay, refCount } from "rxjs/operators";

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

  clearCache() {
    this.observableAllPending = null;
    this.observableIteration = null;
  }
}
