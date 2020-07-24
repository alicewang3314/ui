import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpEventType } from '@angular/common/http';
import { formatDate } from '@angular/common';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { LoaderService } from 'src/app/components';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private loaderService: LoaderService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.show();

    return next.handle(req).pipe(
      tap(event => {

        const isBlobResponse = (event: any) => {
          const { body } = event;

          if (!body) return;

          return event instanceof HttpResponse && body instanceof Blob;
        };

        if (isBlobResponse(event)) {
          this.downloadFile(event);
        }
      }),
      finalize(() => this.loaderService.hide())
    );
  }

  downloadFile(resp: any) {
    const blob = new Blob([resp], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(blob, `Changesets-Report_${formatDate(new Date(), "MMddyy-hhmmss", "en-us")}.xlsx`);
      return;
    }

    // Create a link pointing to the ObjectURL containing the blob.
    const urlBlob = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = urlBlob;
    link.download = `Changesets-Report_${formatDate(new Date(), "MMddyy-hhmmss", "en-us")}.xlsx`;
    link.click();
  }
}


