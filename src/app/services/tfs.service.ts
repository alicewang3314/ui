import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { APIS } from 'src/app/constants';
import { environment } from 'src/environments/environment';
import handleError from 'src/app/http/http-error-handler';

@Injectable({
  providedIn: 'root'
})
export class TfsService {

  constructor(private http: HttpClient) { }

  getCurrent(setting: any): Observable<any> {
    const url = environment.baseUrl + APIS.CURRENT_ITERATION;
    const options = {
      headers: {
        'Content-Type': 'application/json',
      }
    };
    return this.http.post(url, setting, options).pipe(
      retry(2),
      catchError(handleError)
    );
  }

  getAll(setting: any): Observable<any> {
    const url = environment.baseUrl + APIS.ALL_ITERATIONS;
    const options = {
      headers: {
        'Content-Type': 'application/json',
      }
    };
    return this.http.post(url, setting, options).pipe(
      retry(2),
      catchError(handleError)
    );
  }

  getSetting() {
    const url = environment.baseUrl + APIS.USER_SETTING;
    const options = {
      headers: {
        'Content-Type': 'application/json',
      }
    };
    return this.http.get(url, options).pipe(
      retry(2),
      catchError(handleError)
    );
  }

  updateSetting(settings: any) {
    const url = environment.baseUrl + APIS.USER_SETTING;
    const options = {
      headers: {
        'Content-Type': 'application/json',
      }
    };
    return this.http.put(url, settings, options).pipe(
      retry(2),
      catchError(handleError)
    );
  }

  createSetting(settings: any) {
    const url = environment.baseUrl + APIS.USER_SETTING;
    const options = {
      headers: {
        'Content-Type': 'application/json',
      }
    };
    return this.http.post(url, settings, options).pipe(
      retry(2),
      catchError(handleError)
    );
  }

  getProjects() {
    const url = environment.baseUrl + APIS.TFS_PROJECT;
    return this.http.get(url, { responseType: 'json' })
      .pipe(
        retry(2),
        catchError(handleError)
      );
  }
}