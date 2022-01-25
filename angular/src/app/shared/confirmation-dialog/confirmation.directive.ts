import {Directive, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmationDialogComponent, ConfirmDialogData} from './confirmation-dialog.component';
import {DomSanitizer} from '@angular/platform-browser';

@Directive({
  selector: '[appConfirmation]',
})
export class ConfirmationDirective implements OnInit {
  @Input() confirmTitle!: string;
  @Input() confirmMessage!: string;

  @Input() hideConfirmButton = false;
  @Input() confirmButtonText = 'ok';
  @Input() confirmButtonType = 'secondary';

  @Input() cancelButtonText = 'cancel';

  @Output() confirm: EventEmitter<void> = new EventEmitter();

  constructor(private matDialog: MatDialog, private domSanitizer: DomSanitizer) {
  }

  @HostListener('click')
  togglePopover(): void {
    this.openDialog();
  }

  ngOnInit(): void {
    if (!this.confirmTitle || !this.confirmMessage) {
      throw new Error('confirmTitle and confirmMessage are required');
    }
  }

  private openDialog(): void {
    const data: ConfirmDialogData = {
      confirmTitle: this.confirmTitle,
      confirmMessageSafeHtml: this.domSanitizer.bypassSecurityTrustHtml(this.confirmMessage),
      hideConfirmButton: this.hideConfirmButton,
      confirmButtonText: this.confirmButtonText,
      confirmButtonType: this.confirmButtonType,
      cancelButtonText: this.cancelButtonText,
    };
    this.matDialog
      .open(ConfirmationDialogComponent, {data, autoFocus: false})
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.confirm.emit();
        }
      });
  }
}
