/*import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.checkLoginStatus());
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  private userSubject = new BehaviorSubject<any>(this.getUserFromLocalStorage());
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: { email: string; password: string }) {
    return this.http.post<{ success: boolean; token: string; user: any }>('http://localhost:3000/login', credentials);
  }

  setLoggedIn(isLoggedIn: boolean) {
    this.isLoggedInSubject.next(isLoggedIn);
  }

  setUser (user: any) {
    this.userSubject.next(user);
  }

  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    this.setLoggedIn(false);
    this.setUser (null);
    this.router.navigate(['/login']); // Redirect to login page
  }

  isLoggedIn(): boolean {
    return this.isLoggedInSubject.value;
  }

  private checkLoginStatus(): boolean {
    return !!localStorage.getItem('authToken');
  }

  private getUserFromLocalStorage(): any {
    return JSON.parse(localStorage.getItem('user') || 'null');
  }
}*/

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { SharedService } from '../shared/sharedIsLoggedIn';
import {HttpClient} from "@angular/common/http"; // Importiere den SharedService

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.checkLoginStatus());
  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  private userEmailSubject = new BehaviorSubject<string>(''); // Reaktive Variable für UI-Updates
  userEmail$ = this.userEmailSubject.asObservable();
  private userPassword: string = ''; // Store the user's password

  constructor(private router: Router, private sharedService: SharedService, private http: HttpClient) {}

  fetchUserEmail(): void {
    this.http.get<{ userEmail: string }>('http://localhost:3000/get-user-email', { withCredentials: true })
      .subscribe({
        next: (response) => {
          this.userEmailSubject.next(response.userEmail); // Setze die E-Mail und aktualisiere UI
        },
        error: () => {
          console.warn('Keine Session gefunden oder nicht eingeloggt.');
        }
      });
  }

  fetchUserPassword(): void {
    this.http.get<{ password: string }>('http://localhost:3000/get-user-password', { withCredentials: true })
      .subscribe({
        next: (response) => {
          this.userPassword = response.password; // Set the password
        },
        error: () => {
          console.warn('Error fetching user password.');
        }
      });
  }

  login(token: string, password: string) {
    localStorage.setItem('authToken', token);
    this.userPassword = password; // Store the password
    this.isLoggedInSubject.next(true);
    this.sharedService.setSharedVariable(true);  // 🔥 Login-Status global setzen
    this.router.navigate(['/home']);
  }

  logout(): void {
    this.http.post('http://localhost:3000/logout', {}, { withCredentials: true }).subscribe({
      next: () => {
        this.userEmailSubject.next(''); // Löscht die gespeicherte E-Mail
        this.isLoggedInSubject.next(false); // Setzt den Login-Status zurück
        this.sharedService.setSharedVariable(false); // Globalen Zustand zurücksetzen
        localStorage.removeItem('authToken'); // Token entfernen
        this.router.navigate(['/login']); // Nutzer zur Login-Seite weiterleiten
        console.log('Logout erfolgreich');
      },
      error: () => console.warn('Logout fehlgeschlagen.')
    });
  }

  getPassword(): string {
    return this.userPassword;
  }

  isLoggedIn(): boolean {
    return this.isLoggedInSubject.value;
  }

  private checkLoginStatus(): boolean {
    return !!localStorage.getItem('authToken');
  }
}
