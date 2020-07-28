import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  constructor(private snackBar: MatSnackBar) { }

  message(text: string) {
    this.snackBar.open(text, null, { duration: 2000, horizontalPosition: 'center' });
  }
}