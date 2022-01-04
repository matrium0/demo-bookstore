import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SafeHtml } from '@angular/platform-browser';

export interface ConfirmDialogData {
  confirmTitle: string;
  confirmMessageSafeHtml: SafeHtml;
  confirmButtonText: string;
  confirmButtonType: string;
  cancelButtonText: string;
}

@Component({
  selector: 'bb-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss'],
})
export class ConfirmationDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData,
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>
  ) {}

  ngOnInit(): void {}

  dismissDialog(): void {
    this.dialogRef.close();
  }

  confirmClicked(): void {
    this.dialogRef.close('confirmed');
  }
}
