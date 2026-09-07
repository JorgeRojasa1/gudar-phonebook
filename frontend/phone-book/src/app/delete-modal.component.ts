import { Component, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Contact } from './models/contact';

@Component({
  selector: 'app-delete-modal',
  standalone: true,
  templateUrl: './delete-modal.component.html'
})
export class DeleteModalComponent {
  readonly activeModal = inject(NgbActiveModal);
  contact!: Contact;
}
