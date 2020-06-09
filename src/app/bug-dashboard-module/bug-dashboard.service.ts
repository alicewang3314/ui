import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { throwError, } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from "src/environments/environment";
import { APIS } from 'src/app/constants';

@Injectable({
  providedIn: 'root'
})
export class BugDashboardService {
  private url = environment.baseUrl + APIS.BUG_REPORT;

  constructor(private http: HttpClient) { }

  getBugReport() {
    return this.http.request('get', this.url, { responseType: 'json' })
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
}



