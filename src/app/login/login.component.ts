import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, ValueChangeEvent } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from '../shared/sharedIsLoggedIn';
import { CommonModule } from '@angular/common';

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormFieldModule, MatInputModule, MatCardModule, MatButtonModule, ReactiveFormsModule, MatIconModule, CommonModule
  ], 
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
  
})
export class LoginComponent implements OnInit{
  email: string = '';
  password: string = '';
  isPasswordValid: boolean = false;
  

  constructor(private sharedService: SharedService) {}

  ngOnInit(): void {
    // Überwache den Status von isLogin
    this.sharedService.sharedVariable$.subscribe(value => {
      console.log('isLogin Status in der Login-Komponente:', value);
    });
  }

  onEmailInput(event: Event): void{
      const inputElement = event.target as HTMLInputElement;
      this.email = inputElement.value;
    }

  onPasswordInput(event: Event): void {
      const inputElement = event.target as HTMLInputElement;
      this.password = inputElement.value;
  
      // Überprüfen, ob das Passwort weniger als 8 Zeichen hat
      if (!passwordPattern.test(this.password)) {
      console.log('Password status: has-error');
      this.isPasswordValid = false;
        }else {
      console.log('Password status: is-valid');
      this.isPasswordValid = true;
        }
    }

  preventClick(event: Event): void {
    if (!this.isPasswordValid){
      console.log('Button is disabled, cannot proceed');
      event.preventDefault();
    }
  }

  loginUser(): void {
    if (this.isPasswordValid) {
      this.sharedService.setSharedVariable(true);
      console.log('Der Benutzer hat sich erfolgreich eingeloggt.');
    } else {
      console.log('Das Passwort ist ungültig, der Benutzer kann sich nicht einloggen.');
    }
  }

}
