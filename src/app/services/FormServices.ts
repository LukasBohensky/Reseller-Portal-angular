import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Instance {
  status: string;
  erstellungsdatum: string;
  anrede?: string;
  kontaktperson?: string;
  anschrift?: string;
  telefonnummer?: number;
  kundenname: string;
  hostname: string;
  email: string;
  user?: string;
}

@Injectable({
  providedIn: 'root'
})
export class FormService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  saveForm(formValues: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/save-form`, formValues);
  }

  getForms(): Observable<any> {
    return this.http.get<Instance[]>(`${this.baseUrl}/get-forms`);
  }
}