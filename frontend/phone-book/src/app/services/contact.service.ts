import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact, ContactType } from '../models/contact';

@Injectable({ providedIn: 'root' })
export class ContactService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:5050/api/contacts';

  getAll(type?: ContactType): Observable<Contact[]> {
    let params = new HttpParams();
    if (type) params = params.set('type', type);
    return this.http.get<Contact[]>(this.apiUrl, { params });
  }

  create(contact: Omit<Contact, 'id'>): Observable<Contact> {
    return this.http.post<Contact>(this.apiUrl, contact);
  }

  update(contact: Contact): Observable<Contact> {
    return this.http.put<Contact>(`${this.apiUrl}/${contact.id}`, contact);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
