import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import {
  Contact,
  ContactType,
  CONTACT_TYPES
} from './models/contact';

import { ContactService } from './services/contact.service';

@Component({
  selector: 'app-contact-form-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact-form-modal.component.html'
})
export class ContactFormModalComponent {

  readonly activeModal = inject(NgbActiveModal);
  private readonly service = inject(ContactService);

  readonly types = CONTACT_TYPES;

  contact: Contact | null = null;

  saving = false;
  error = '';

  form: Contact = {
    id: 0,
    contactType: 'Person',
    name: '',
    phoneNumber: '',
    comments: '',
    firstName: '',
    lastName: '',
    governmentSector: '',
    website: '',
    industry: ''
  };

  ngOnInit(): void {
    if (this.contact) {
      this.form = { ...this.contact };
    }
  }

  get editing(): boolean {
    return this.form.id > 0;
  }

  changeType(): void {
    this.form.firstName = '';
    this.form.lastName = '';
    this.form.governmentSector = '';
    this.form.website = '';
    this.form.industry = '';
  }

  isInvalid(value: unknown): boolean {
    return (
      value === null ||
      value === undefined ||
      String(value).trim() === ''
    );
  }

  save(): void {

    this.error = '';

    if (
      this.isInvalid(this.form.name) ||
      this.isInvalid(this.form.phoneNumber)
    ) {
      this.error =
        'El nombre y el teléfono son obligatorios.';
      return;
    }

    if (
      this.form.contactType === 'Person' &&
      (
        this.isInvalid(this.form.firstName) ||
        this.isInvalid(this.form.lastName)
      )
    ) {
      this.error =
        'El nombre y el apellido son obligatorios para las personas.';
      return;
    }

    if (
      this.form.contactType === 'PublicOrganization' &&
      this.isInvalid(this.form.governmentSector)
    ) {
      this.error =
        'El sector gubernamental es obligatorio para las organizaciones públicas.';
      return;
    }

    if (
      this.form.contactType === 'PrivateOrganization' &&
      this.isInvalid(this.form.industry)
    ) {
      this.error =
        'La industria es obligatoria para las organizaciones privadas.';
      return;
    }

    this.saving = true;

    const { id, ...payload } = this.form;

    const request = this.editing
      ? this.service.update(this.form)
      : this.service.create(payload);

    request.subscribe({

      next: () => {
        this.activeModal.close(true);
      },

      error: err => {

        console.error('Error al guardar contacto:', err);

        this.error =
          err.error?.message ??
          'No se pudo guardar el contacto.';

        this.saving = false;
      }

    });

  }

}
