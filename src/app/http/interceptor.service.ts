import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize, tap, catchError } from 'rxjs/operators';
import { LoaderService } from 'src/app/components';
import { MatSnackBar } from '@angular/material/snack-bar';
import ErrorHandler from './http-error-handler';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(
    private loaderService: LoaderService,
    private message: MatSnackBar) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.show();

    return next.handle(req)
      .pipe(
        catchError(ErrorHandler),
        // check if its a report export and handle the response
        tap(event => {
          if (!(event instanceof HttpResponse)) return;

          const { body, url, status, statusText } = event;

          if (status !== 200) {
            this.message.open(statusText, null, { duration: 2000, horizontalPosition: 'center' });
            return;
          }

          if (!(body instanceof Blob)) return;

          const fileName = this.generateFileName(url);
          this.downloadFile(body, fileName || 'report');
        }),
        finalize(() => this.loaderService.hide())
      );
  }

  private generateFileName(url: string): string {
    let from: any = /(?:from=)(.+?T)/.exec(url);
    from = from ? from[1].slice(0, -1) : '';

    let to: any = /(?:to=)(.+?T)/.exec(url);
    to = to ? to[1].slice(0, -1) : '';

    let project: any = /(?:project=)(.+?(&|$))/.exec(url);
    project = project ?
      project[1].slice(-1) === '&'
        ? project.slice(0, -1)
        : project
      : '';

    let path: any = /(?:path=)(.+?(&|$))/.exec(url);
    path = path ? path[1] : '';

    let tag: any = /(?:tag=)(.+?$)/.exec(url);
    tag = tag ? tag[1] : '';

    return `
      ${from ? from : ''}
      ${to ? '_' + to : ''}
      ${project ? '_' + project : ''}
      ${path ? '_' + path : ''}
      ${tag || ''}
    `;
  }

  private downloadFile(data: any, fileName: string) {
    const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(blob, fileName);
      return;
    }

    const urlBlob = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = urlBlob;
    link.download = fileName;
    link.click();
  }
}


