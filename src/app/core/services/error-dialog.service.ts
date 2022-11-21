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
  public openDialog(message: string, topic: string): void {
    this.modalRef = this.modalService.open(ErrorDialogComponent, {
      centered: true,
    });
    const modal: Element | undefined = document
      .querySelector('ngb-modal-window')
      ?.getElementsByClassName('modal-content')[0];
    this.modalRef.componentInstance.error = {
      message: message,
      topic: topic,
      modal: modal,
    };
  }
}
