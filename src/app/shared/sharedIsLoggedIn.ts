import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  // Die isLogin Variable als BehaviorSubject
  private sharedVariableSubject = new BehaviorSubject<boolean>(false);
  
  // Observable für alle Komponenten zugänglich
  sharedVariable$ = this.sharedVariableSubject.asObservable();

  // Methode zum Setzen der Variable
  setSharedVariable(value: boolean): void {
    console.log('isLogin wird auf', value, 'gesetzt');
    this.sharedVariableSubject.next(value);
  }

  // Synchrones Abrufen des Status
  getSharedVariable(): boolean {
    return this.sharedVariableSubject.getValue();
  }
}