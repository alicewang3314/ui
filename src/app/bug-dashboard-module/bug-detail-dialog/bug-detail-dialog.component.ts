import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'bug-detail-dialog',
  templateUrl: './bug-detail-dialog.component.html',
})

export class BugDetailsDialog {
  constructor(
    public dialogRef: MatDialogRef<BugDetailsDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onCloseClick(): void {
    this.dialogRef.close();
  }
}