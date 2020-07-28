import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { catchError, retry } from 'rxjs/operators';
import { environment } from "src/environments/environment";
import { APIS } from 'src/app/constants';
import handleError from 'src/app/http/http-error-handler';

@Injectable({
  providedIn: 'root'
})
export class BugDashboardService {
  private url = environment.baseUrl + APIS.BUG_REPORT;

  constructor(private http: HttpClient) { }

  getBugReport() {
    return this.http.request('get', this.url, { responseType: 'json' })
      .pipe(
        catchError(handleError)
      );
  }
}



