import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpResponse,
  HttpResponseBase
} from "@angular/common/http";
import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TfsReportService {

  constructor(private http: HttpClient) { }

  apiChangesetsReport(from: Date | undefined, to: Date | undefined, project: string | null | undefined, path: string | null | undefined): Observable<FileResponse> {
    let url_ = environment.baseUrl + "/Changesets/Report?";
    if (from === null)
      throw new Error("The parameter 'from' cannot be null.");
    else if (from !== undefined)
      url_ += "from=" + encodeURIComponent(from ? "" + from.toJSON() : "") + "&";
    if (to === null)
      throw new Error("The parameter 'to' cannot be null.");
    else if (to !== undefined)
      url_ += "to=" + encodeURIComponent(to ? "" + to.toJSON() : "") + "&";
    if (project !== undefined)
      url_ += "project=" + encodeURIComponent("" + project) + "&";
    if (path !== undefined)
      url_ += "path=" + encodeURIComponent("" + path) + "&";
    url_ = url_.replace(/[?&]$/, "");

    let options_: any = {
      observe: "response",
      responseType: "blob",
      headers: new HttpHeaders({
        "Accept": "application/json"
      })
    };

    return this.http.request("get", url_, options_)
      .pipe(_observableMergeMap((response_: any) => {
        return this.processReport(response_);
      }))
      .pipe(_observableCatch((response_: any) => {

        if (response_ instanceof HttpResponseBase) {

          try {
            return this.processReport(<any>response_);
          }
          catch (e) {
            return <Observable<FileResponse>><any>_observableThrow(e);
          }
        }
        else
          return <Observable<FileResponse>><any>_observableThrow(response_);
      }));
  }

  apiBugsReport(from: Date | undefined, to: Date | undefined, project: string | null | undefined, path: string | null | undefined): Observable<FileResponse> {
    let url_ = environment.baseUrl + "/Bugs/Report?";
    if (from === null)
      throw new Error("The parameter 'from' cannot be null.");
    else if (from !== undefined)
      url_ += "from=" + encodeURIComponent(from ? "" + from.toJSON() : "") + "&";
    if (to === null)
      throw new Error("The parameter 'to' cannot be null.");
    else if (to !== undefined)
      url_ += "to=" + encodeURIComponent(to ? "" + to.toJSON() : "") + "&";
    if (project !== undefined)
      url_ += "project=" + encodeURIComponent("" + project) + "&";
    // if (path !== undefined)
    //   url_ += "path=" + encodeURIComponent("" + path) + "&";
    console.log('_url', url_);

    url_ = url_.replace(/[?&]$/, "");

    console.log('_url', url_);

    let options_: any = {
      observe: "response",
      responseType: "blob",
      headers: new HttpHeaders({
        "Accept": "application/json"
      })
    };

    return this.http.request("get", url_, options_)
      .pipe(_observableMergeMap((response_: any) => {
        return this.processReport(response_);
      })).pipe(_observableCatch((response_: any) => {

        if (response_ instanceof HttpResponseBase) {

          try {
            return this.processReport(<any>response_);
          } catch (e) {
            return <Observable<FileResponse>><any>_observableThrow(e);
          }
        }
        else
          return <Observable<FileResponse>><any>_observableThrow(response_);
      }));
  }

  apiBugsTagReport(tag: string | null | undefined): Observable<FileResponse> {
    let url_ = environment.baseUrl + "/Bugs/Tag/Report?";
    if (tag !== undefined)
      url_ += "tag=" + encodeURIComponent("" + tag) + "&";
    url_ = url_.replace(/[?&]$/, "");

    let options_: any = {
      observe: "response",
      responseType: "blob",
      headers: new HttpHeaders({
        "Accept": "application/json"
      })
    };

    return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_: any) => {
      return this.processReport(response_);
    })).pipe(_observableCatch((response_: any) => {
      if (response_ instanceof HttpResponseBase) {
        try {
          return this.processReport(<any>response_);
        } catch (e) {
          return <Observable<FileResponse>><any>_observableThrow(e);
        }
      } else
        return <Observable<FileResponse>><any>_observableThrow(response_);
    }));
  }

  protected processReport(response: HttpResponseBase): Observable<FileResponse> {
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

    if (status === 200 || status === 206) {
      const contentDisposition = response.headers ? response.headers.get("content-disposition") : undefined;
      const fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
      const fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
      return _observableOf({ fileName: fileName, data: <any>responseBlob, status: status, headers: _headers });
    }
    else if (status === 400) {
      return this.blobToText(responseBlob)
        .pipe(_observableMergeMap(_responseText => {
          return this.throwException("A server side error occurred.", status, _responseText, _headers);
        }));
    }
    else if (status !== 200 && status !== 204) {
      return this.blobToText(responseBlob)
        .pipe(_observableMergeMap(_responseText => {
          return this.throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }));
    }
    return _observableOf<FileResponse>(<any>null);
  }

  downloadFile(resp: FileResponse) {
    const blob = new Blob([resp.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(blob, resp.fileName);
      return;
    }

    const urlBlob = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = urlBlob;
    link.download = resp.fileName;
    link.click();
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


export interface FileResponse {
  data: Blob;
  status: number;
  fileName?: string;
  headers?: { [name: string]: any };
}

export interface BugChangesetDTO {
  id?: number | undefined;
  title?: string | undefined;
  changesets?: ChangesetDTO[] | undefined;
}

export interface ChangesetDTO {
  changesetNo?: number | undefined;
  rel?: string | undefined;
  attributes?: { [key: string]: any; } | undefined;
  author?: string | undefined;
  comment?: string | undefined;
  createdDate: Date;
  path?: string | undefined;
}

export class ApiException extends Error {
  message: string;
  status: number;
  response: string;
  headers: { [key: string]: any; };
  result: any;

  constructor(message: string, status: number, response: string, headers: { [key: string]: any; }, result: any) {
    super();

    this.message = message;
    this.status = status;
    this.response = response;
    this.headers = headers;
    this.result = result;
  }

  protected isApiException = true;

  static isApiException(obj: any): obj is ApiException {
    return obj.isApiException === true;
  }
}

