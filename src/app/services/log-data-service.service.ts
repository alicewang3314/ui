import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpResponse
} from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LogDataServiceService {

  constructor(private http: HttpClient) { }

  getMostFrequentLogs(env: string, application: string): Observable<any[]> {
    let url_ = environment.baseLogApiUrl + "/api/logdatas/MostFrequent?env=" + env + "&appNames=" + application;
    url_ = url_.replace(/[?&]$/, "");

    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };

    return this.http.get<any[]>(url_, httpOptions);
  }

  searchExceptions(env: string, application: string, fromDate: string, toDate: string, pageSize: number, pageNumber: number): Observable<HttpResponse<any[]>> {
    let url_ = environment.baseLogApiUrl + "/api/logdatas/Search?env=" + env
      + "&appNames=" + application
      + "&fromDate=" + fromDate
      + "&toDate=" + toDate;

    url_ = url_.replace(/[?&]$/, "");

    var headers = new HttpHeaders({
      "Content-Type": "application/json",
      "pageSize": pageSize.toString(),
      "pageNumber": pageNumber.toString()
    });

    return this.http.get<any[]>(url_, { headers: headers, observe: 'response' });
  }
}


