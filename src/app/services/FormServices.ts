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
  private apiUrl = 'http://localhost:3000/get-customers';

  constructor(private http: HttpClient) {}

  getCustomers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, {
      withCredentials: true
    }); // Daten abrufen
  }

  getCustomersDisabled(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + '/disabled', {
      withCredentials: true
    }); // Daten abrufen
  }

  updateCustomer(data: any): Observable<any> {
    const apiUrl = 'http://localhost:3000/update-customer';
    return this.http.put(apiUrl, data, {
      withCredentials: true
    });
  }

  deleteCustomer(domainName: string): Observable<any> {
    const apiUrl = `http://localhost:3000/delete-customer/${domainName}`;
    console.log('Aufruf der URL:', apiUrl);
    return this.http.delete(apiUrl, {
      withCredentials: true
    });
  }

  /*saveForm(formValues: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/save-form`, formValues);
  }

  getForms(): Observable<any> {
    return this.http.get<Instance[]>(`${this.baseUrl}/get-forms`);
  }*/
}
