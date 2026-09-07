import {
  ChangeDetectorRef,
  Component,
  inject,
  OnInit
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import {
  Contact,
  ContactType,
  CONTACT_TYPES
} from './models/contact';

import { ContactService } from './services/contact.service';
import { ContactFormModalComponent } from './contact-form-modal.component';
import { DeleteModalComponent } from './delete-modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgbModalModule
  ],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  private readonly service = inject(ContactService);
  private readonly modal = inject(NgbModal);
  private readonly cdr = inject(ChangeDetectorRef);

  readonly types = CONTACT_TYPES;

  contacts: Contact[] = [];

  selectedTypes = new Set<ContactType>(
    CONTACT_TYPES.map(t => t.value)
  );

  loading = false;
  error = '';

  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts(): void {
    this.loading = true;
    this.error = '';

    this.service.getAll().subscribe({

      next: (contacts: Contact[]) => {
        this.contacts = contacts;
        this.loading = false;

        this.cdr.detectChanges();
      },

      error: (err) => {
        console.error('Error loading contacts:', err);

        this.error =
          err.error?.message ??
          'Could not load contacts.';

        this.loading = false;

        this.cdr.detectChanges();
      }

    });
  }

  toggleType(type: ContactType): void {

    if (this.selectedTypes.has(type)) {
      this.selectedTypes.delete(type);
    } else {
      this.selectedTypes.add(type);
    }

  }

  isSelected(type: ContactType): boolean {
    return this.selectedTypes.has(type);
  }

  get filteredContacts(): Contact[] {
    return this.contacts.filter(
      contact =>
        this.selectedTypes.has(contact.contactType)
    );
  }

  label(type: ContactType): string {

    return (
      this.types.find(
        t => t.value === type
      )?.label ?? type
    );

  }

  openAdd(): void {

    const ref = this.modal.open(
      ContactFormModalComponent,
      {
        size: 'lg',
        centered: true
      }
    );

    ref.componentInstance.contact = null;

    ref.closed.subscribe(result => {

      if (result) {
        this.loadContacts();
      }

    });

  }

  openEdit(contact: Contact): void {

    const ref = this.modal.open(
      ContactFormModalComponent,
      {
        size: 'lg',
        centered: true
      }
    );

    ref.componentInstance.contact = {
      ...contact
    };

    ref.closed.subscribe(result => {

      if (result) {
        this.loadContacts();
      }

    });

  }

  openDelete(contact: Contact): void {

    const ref = this.modal.open(
      DeleteModalComponent,
      {
        centered: true
      }
    );

    ref.componentInstance.contact = contact;

    ref.closed.subscribe(
      (confirmed: boolean) => {

        if (!confirmed) {
          return;
        }

        this.service.delete(contact.id).subscribe({

          next: () => {
            this.loadContacts();
          },

          error: (err) => {

            this.error =
              err.error?.message ??
              'Could not delete contact.';

            this.cdr.detectChanges();
          }

        });

      }
    );

  }

}