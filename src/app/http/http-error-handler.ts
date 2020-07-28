import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

const handleError = (error: HttpErrorResponse | any, logger: any) => {
  if (error.error instanceof ErrorEvent) {
    console.error('An error occurred:', error.error.message);
  } else {
    console.error(`Error: ${error.status},  ${error.statusText}`);
  }

  return throwError('Something bad happened; please try again later.');
};

export default handleError;