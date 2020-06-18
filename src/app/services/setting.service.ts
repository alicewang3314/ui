import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpResponse,
  HttpResponseBase
} from "@angular/common/http";
import { mergeMap as _observableMergeMap, catchError as _observableCatch, publishReplay, refCount } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { environment } from 'src/environments/environment';
import { APIS } from 'src/app/constants'
import { ApiException } from '../tfs-reports-module/tfs-report-service.';
import { TfsProject, Settings } from 'src/app/types';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

  constructor(private http: HttpClient) { }


  getProjectsFromTFS(): Observable<TfsProject[]> {
    let url_ = environment.baseUrl + APIS.TFS_PROJECT_SETTING;

    let options_: any = {
      observe: "response",
      responseType: "blob",
      headers: new HttpHeaders({
        "Accept": "application/json"
      })
    };

    return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_: any) => {
      return this.processSettings_GetProjectList(response_);
    }))
      .pipe(_observableCatch((response_: any) => {
        if (response_ instanceof HttpResponseBase) {
          try {
            return this.processSettings_GetProjectList(<any>response_);
          }
          catch (e) {
            return <Observable<TfsProject[]>><any>_observableThrow(e);
          }
        }
        else
          return <Observable<TfsProject[]>><any>_observableThrow(response_);
      }));
  }

  protected processSettings_GetProjectList(response: HttpResponseBase): Observable<TfsProject[]> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse ? response.body :
        (<any>response).error instanceof Blob ? (<any>response).error : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }
    }
    if (status === 200) {
      return this.blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
        let result200: any = null;
        result200 = _responseText === "" ? null : <TfsProject[]>JSON.parse(_responseText, this.jsonParseReviver);
        return _observableOf(result200);
      }));
    } else if (status === 500) {
      return this.blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
        return this.throwException("A server side error occurred.", status, _responseText, _headers);
      }));
    } else if (status !== 200 && status !== 204) {
      return this.blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
        return this.throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return _observableOf<TfsProject[]>(<any>null);
  }

  dbSettings: Observable<Settings>;

  getProjectsTeamsFromDb(): Observable<Settings> {
    let url_ = environment.baseUrl + APIS.USER_SETTING;

    let options_: any = {
      observe: "response",
      responseType: "blob",
      headers: new HttpHeaders({
        "Accept": "application/json"
      })
    };

    if (!this.dbSettings) {
      this.dbSettings = this.http.request("get", url_, options_)
        .pipe(_observableMergeMap((response_: any) => {
          return this.processSettings_GetProjectsTeamsFromDb(response_);
        }),
          publishReplay(1),//cache
          refCount()
        )
        .pipe(_observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processSettings_GetProjectsTeamsFromDb(<any>response_);
            }
            catch (e) {
              return <Observable<Settings>><any>_observableThrow(e);
            }
          }
          else
            return <Observable<Settings>><any>_observableThrow(response_);
        }));
    }

    return this.dbSettings;
  }

  protected processSettings_GetProjectsTeamsFromDb(response: HttpResponseBase): Observable<Settings> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse ? response.body :
        (<any>response).error instanceof Blob ? (<any>response).error : undefined;

    let _headers: any = {};

    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return this.blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
        let result200: any = null;
        result200 = _responseText === "" ? null : <Settings>JSON.parse(_responseText, this.jsonParseReviver);
        return _observableOf(result200);
      }));
    } else if (status === 500) {
      return this.blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
        return this.throwException("A server side error occurred.", status, _responseText, _headers);
      }));
    } else if (status !== 200 && status !== 204) {
      return this.blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
        return this.throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return _observableOf<Settings>(<any>null);
  }

  addSettings(settings: Settings): Observable<number> {
    let url_ = environment.baseUrl + APIS.USER_SETTING;

    const content_ = JSON.stringify(settings);

    let options_: any = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Accept": "application/json"
      })
    };

    return this.http.request("post", url_, options_)
      .pipe(_observableMergeMap((response_: any) => {
        return this.processSettings_UpdateSettings(response_);
      }))
      .pipe(_observableCatch((response_: any) => {
        if (response_ instanceof HttpResponseBase) {
          try {
            return this.processSettings_UpdateSettings(<any>response_);
          }
          catch (e) {
            return <Observable<number>><any>_observableThrow(e);
          }
        }
        else
          return <Observable<number>><any>_observableThrow(response_);
      }));
  }

  updateSettings(settings: Settings): Observable<number> {
    let url_ = environment.baseUrl + APIS.USER_SETTING;

    const content_ = JSON.stringify(settings);

    let options_: any = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Accept": "application/json"
      })
    };

    return this.http.request("put", url_, options_)
      .pipe(_observableMergeMap((response_: any) => {
        return this.processSettings_UpdateSettings(response_);
      }))
      .pipe(_observableCatch((response_: any) => {
        if (response_ instanceof HttpResponseBase) {
          try {
            return this.processSettings_UpdateSettings(<any>response_);
          }
          catch (e) {
            return <Observable<number>><any>_observableThrow(e);
          }
        }
        else
          return <Observable<number>><any>_observableThrow(response_);
      }));
  }

  protected processSettings_UpdateSettings(response: HttpResponseBase): Observable<number> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse ? response.body :
        (<any>response).error instanceof Blob ? (<any>response).error : undefined;

    let _headers: any = {};

    if (response.headers) {
      for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }
    }
    if (status === 200) {
      return this.blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
        let result200: any = null;
        result200 = _responseText === "" ? null : <number>JSON.parse(_responseText, this.jsonParseReviver);
        return _observableOf(result200);
      }));
    }
    else if (status === 500) {
      return this.blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
        return this.throwException("A server side error occurred.", status, _responseText, _headers);
      }));
    }
    else if (status !== 200 && status !== 204) {
      return this.blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
        return this.throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return _observableOf<number>(<any>null);
  }

  clearCache() {
    this.dbSettings = null;
  }

  protected throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): Observable<any> {
    if (result !== null && result !== undefined)
      return _observableThrow(result);
    else
      return _observableThrow(new ApiException(message, status, response, headers, null));
  }

  protected blobToText(blob: any): Observable<string> {
    return new Observable<string>((observer: any) => {
      if (!blob) {
        observer.next("");
        observer.complete();
      } else {
        let reader = new FileReader();
        reader.onload = event => {
          observer.next((<any>event.target).result);
          observer.complete();
        };
        reader.readAsText(blob);
      }
    });
  }
}
