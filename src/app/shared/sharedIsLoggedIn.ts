import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface User{
  email: string;
  password: string;
}
@Injectable({
  providedIn: 'root'
})
export class SharedService {
  // Die isLogin Variable als BehaviorSubject
  private sharedVariableSubject = new BehaviorSubject<boolean>(false);

  private user =  new BehaviorSubject<User | undefined>(undefined);

  // Observable für alle Komponenten zugänglich
  sharedVariable$ = this.sharedVariableSubject.asObservable();

  user$ = this.user.asObservable();

  // Methode zum Setzen der Variable
  setSharedVariable(value: boolean): void {
    console.log('isLogin wird auf', value, 'gesetzt');
    this.sharedVariableSubject.next(value);
  }

  setUser(value: User): void {
    console.log('User wird auf', value, 'gesetzt');
    this.user.next(value);
  }

  getUsermail(): string {
    const user = this.user.getValue();
    if (user) {
      return user.email;
    }
    return '';
  }

  // Synchrones Abrufen des Status
  getSharedVariable(): boolean {
    return this.sharedVariableSubject.getValue();
  }
}
