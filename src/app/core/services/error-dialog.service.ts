import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class ErrorDialogService {
  protected modalRef?: NgbModalRef;
  constructor(private readonly modalService: NgbModal) {
    // TODO
  }
  public openDialog(error: string): void {
    this.modalRef = this.modalService.open(ErrorDialogComponent, {
      centered: true,
    });
    this.modalRef.componentInstance.error = error;
    const modal: Element | undefined = document
      .querySelector('ngb-modal-window')
      ?.getElementsByClassName('modal-content')[0];
    modal?.classList.add('error-dialog-modal');
  }
}
