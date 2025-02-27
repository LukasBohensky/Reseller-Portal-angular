import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

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

  constructor(private http: HttpClient) {}

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

  checkLogin() {

    this.http.get('http://localhost:3000/get-user-email', {withCredentials: true}).subscribe((res: any) => {

      if(res.userEmail && res.userEmail != '') {

        this.setSharedVariable(true);
  
      }

    });

  }

}
