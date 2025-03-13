import { Component, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ng-modal-confirm',
  standalone: true,
  template: `
  <div class="modal-header">
    <h5 class="modal-title">Delete Confirmation</h5>
    <button type="button" class="btn close" aria-label="Close" (click)="modal.dismiss()">
      <span aria-hidden="true">×</span>
    </button>
  </div>
  <div class="modal-body">
    <p>Are you sure you want to delete?</p>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss()">CANCEL</button>
    <button type="button" class="btn btn-success" (click)="modal.close(true)">OK</button>
  </div>
  `,
})
export class PopUpComponent {
  modal = inject(NgbActiveModal);
}
