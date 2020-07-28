import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

const handleError = (error: HttpErrorResponse | any) => {
  let errorMessage = '';

  if (error.error instanceof ErrorEvent) {

    errorMessage = `Error: ${error.error.message}`;
  } else {
    errorMessage = `Error Code: ${error.status}\nMessage: ${error.statusText}`;
  }

  console.error('An error occurred:', error.error.message);

  return throwError(errorMessage);
};

export default handleError;