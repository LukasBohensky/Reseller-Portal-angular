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
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {ChangeDetectionStrategy, signal} from '@angular/core';
import { Router } from '@angular/router';

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormFieldModule, MatInputModule, MatCardModule, MatButtonModule, ReactiveFormsModule, MatIconModule, CommonModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']

})
export class LoginComponent implements OnInit{
  email: string = '';
  password: string = '';
  isPasswordValid: boolean = false;


  constructor(private sharedService: SharedService, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    // Überwache den Status von isLogin
    this.sharedService.sharedVariable$.subscribe(value => {
      console.log('isLogin Status in der Login-Komponente:', value);
    });
  }

  hide = signal(true);

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
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

  loginUser(event: Event): void {
    event.preventDefault();
    if (this.isPasswordValid) {
      const loginData = {
        email: this.email,
        password: this.password,
      };

      this.http.post('http://localhost:3000/login', loginData, {withCredentials: true}).subscribe({
        next: (response: any) => {
          console.log('Login erfolgreich:', response);
          this.sharedService.setSharedVariable(true);
          this.router.navigate(['/home']);
          //alert('Login erfolgreich!');
        },
        error: (error) => {
          console.error('Login fehlgeschlagen:', error);
          alert('Login fehlgeschlagen!');
        }
      });
    }else {
      console.log('Passwort ungültig');
    }



    /*if (this.isPasswordValid) {
      this.sharedService.setSharedVariable(true);
      console.log('Der Benutzer hat sich erfolgreich eingeloggt.');
    } else {
      console.log('Das Passwort ist ungültig, der Benutzer kann sich nicht einloggen.');
    }*/
  }

  //protected readonly event = event;
}
