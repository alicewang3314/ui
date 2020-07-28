import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { APIS } from 'src/app/constants';
import { environment } from 'src/environments/environment';
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

    return this.http.post(url, setting, options);
  }

  getAll(setting: any): Observable<any> {
    const url = environment.baseUrl + APIS.ALL_ITERATIONS;
    const options = {
      headers: {
        'Content-Type': 'application/json',
      }
    };

    return this.http.post(url, setting, options);
  }

  getSetting() {
    const url = environment.baseUrl + APIS.USER_SETTING;
    const options = {
      headers: {
        'Content-Type': 'application/json',
      }
    };
    return this.http.get(url, options);
  }

  updateSetting(settings: any) {
    const url = environment.baseUrl + APIS.USER_SETTING;
    const options = {
      headers: {
        'Content-Type': 'application/json',
      }
    };

    return this.http.put(url, settings, options);
  }

  createSetting(settings: any) {
    const url = environment.baseUrl + APIS.USER_SETTING;
    const options = {
      headers: {
        'Content-Type': 'application/json',
      }
    };

    return this.http.post(url, settings, options);
  }

  getProjects() {
    const url = environment.baseUrl + APIS.TFS_PROJECT;
    return this.http.get(url, { responseType: 'json' });
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

    return this.http.get(url, options);
  }

  getBugsReport(args: { from: string, to: string, project: string }) {
    const { from, to, project } = args;
    const url = `${environment.baseUrl}${APIS.BUGS_REPORT}`;

    let params = new HttpParams({ encoder: new CustomEncoder() });
    params = params.append('from', from);
    params = params.append('to', to);
    params = params.append('project', project);

    const options = {
      observe: 'response' as 'body',
      responseType: 'blob' as 'json',
      params,
    };

    return this.http.get(url, options);
  }

  getBugsTagReport(args: { tag: string }) {
    const { tag } = args;
    const url = `${environment.baseUrl}${APIS.BUGS_TAG_REPORT}`;

    let params = new HttpParams({ encoder: new CustomEncoder() });
    params = params.append('tag', tag);

    const options = {
      observe: 'response' as 'body',
      responseType: 'blob' as 'json',
      params,
    };

    return this.http.get(url, options);
  }
}