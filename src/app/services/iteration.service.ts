import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpResponse,
  HttpResponseBase
} from "@angular/common/http";
import { IterationReport } from "../dto/iterationReport";
import { mergeMap, catchError } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { environment } from "src/environments/environment";
import { ApiException } from '../tfs-reports-module/tfs-report-service';

@Injectable({
  providedIn: "root"
})
export class IterationService {
  _http: HttpClient;
  private baseUrl = environment.baseUrl;

  protected jsonParseReviver:
    | ((key: string, value: any) => any)
    | undefined = undefined;

  constructor(http: HttpClient) {
    this._http = http;
  }

  getCurrent2(userSettings): Observable<IterationReport> {
    let url_ = this.baseUrl + "/Iteration/Current2";

    //const content_ = JSON.stringify(userSettings);
    const content = userSettings;

    let options_: any = {
      body: content,
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        "Content-Type": 'application/json',
        "Accept": 'application/json'
      })
    };

    return this._http.request("post", url_, options_)
      .pipe(
        mergeMap((response_: any) => {
          return this.processRequest(response_);
        }),

      )
      .pipe(catchError((response_: any) => {
        if (response_ instanceof HttpResponseBase) {
          try {
            return this.processRequest(<any>response_);
          }
          catch (e) {
            return <Observable<number>><any>throwError(e);
          }
        }
        else
          return <Observable<number>><any>throwError(response_);
      }));
  }

  getAllPending2(userSettings) {

    let url_ = this.baseUrl + "/Iteration/AllPending2";
    const content = userSettings;

    let options_: any = {
      body: content,
      observe: "response",
      responseType: "blob",
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Accept": "application/json"
      })
    };

    return this._http.request("post", url_, options_)
      .pipe(
        mergeMap((response_: any) => {
          return this.processRequest(response_);
        }),
      )
      .pipe(catchError((response_: any) => {
        if (response_ instanceof HttpResponseBase) {
          try {
            return this.processRequest(<any>response_);
          }
          catch (e) {
            return <Observable<number>><any>throwError(e);
          }
        }
        else
          return <Observable<number>><any>throwError(response_);
      }));
  }

  protected processRequest(response: HttpResponseBase): Observable<any> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse ? response.body :
        (<any>response).error instanceof Blob ? (<any>response).error : undefined;

    let _headers: any = {};

    if (response.headers) {
      for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }
    }
    if (status === 200) {
      return this.blobToText(responseBlob).pipe(mergeMap(_responseText => {
        let result200: any = null;
        result200 = _responseText === "" ? null : <any>JSON.parse(_responseText, this.jsonParseReviver);
        return of(result200);
      }));
    }
    else if (status === 500) {
      return this.blobToText(responseBlob).pipe(mergeMap(_responseText => {
        return this.throwException("A server side error occurred.", status, _responseText, _headers);
      }));
    }
    else if (status !== 200 && status !== 204) {
      return this.blobToText(responseBlob).pipe(mergeMap(_responseText => {
        return this.throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return of<any>(<any>null);
  }

  protected throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): Observable<any> {
    if (result !== null && result !== undefined)
      return throwError(result);
    else
      return throwError(new ApiException(message, status, response, headers, null));
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
