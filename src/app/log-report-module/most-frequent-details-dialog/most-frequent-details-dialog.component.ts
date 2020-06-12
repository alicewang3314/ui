import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


export interface MostFrequentDetailsDialogData {
  count: number;
  shortException: string;
  stackTrace: string;
}

@Component({
  selector: 'app-most-frequent-details-dialog',
  templateUrl: './most-frequent-details-dialog.component.html',
  styleUrls: ['./most-frequent-details-dialog.component.css']
})
export class MostFrequentDetailsDialogComponent {

  constructor(   public dialogRef: MatDialogRef<MostFrequentDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MostFrequentDetailsDialogData) { }


  onCloseClick(): void {
    this.dialogRef.close();
  }

}
