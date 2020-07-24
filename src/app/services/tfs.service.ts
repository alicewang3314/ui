import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';

import { APIS } from 'src/app/constants';
import { environment } from 'src/environments/environment';
import handleError from 'src/app/http/http-error-handler';
import { CustomEncoder } from '../http/http-params-encoder';

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

  getChangesetsReport(args: { from: string, to: string, project: string, path?: string }, ) {
    const { from, to, project, path } = args;
    const url = `${environment.baseUrl}${APIS.BUGS_CHANGESETS_REPORT}`;
    let params = new HttpParams({ encoder: new CustomEncoder() });
    params = params.append('from', from);
    params = params.append('to', to);
    params = params.append('project', project);
    params = params.append('path', path);

    const options = {
      observe: 'response' as 'body',
      responseType: 'blob' as 'json',
      params,
    };

    return this.http.get(url, options).pipe(
      retry(2),
      catchError(handleError),
    );
  }

  getBugsReport() {

  }

  getBugsTagReport() {

  }
}