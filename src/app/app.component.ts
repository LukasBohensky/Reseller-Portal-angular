import {MatCommonModule} from '@angular/material/core';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidenavComponent } from "./sidenav/sidenav.component";
import { RouterModule } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'; 
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from "@angular/material/icon";
import { CommonModule } from '@angular/common';
import { NgxPaypalComponent, NgxPayPalModule } from 'ngx-paypal';
import { LoginComponent } from "./login/login.component";
import { SharedService } from './shared/sharedIsLoggedIn';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidenavComponent, RouterModule, MatTooltipModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule, MatCommonModule, MatIconModule, CommonModule, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Reseller Portal';
  isLogin: boolean = false;

  constructor(private sharedService: SharedService) {}

  ngOnInit(): void {
    this.sharedService.sharedVariable$.subscribe(value => {
      console.log('isLogin Status geändert auf:', value);
      this.isLogin = value;
    });
  }

  /**
   * Diese Methode kann aufgerufen werden, wenn der Benutzer erfolgreich eingeloggt ist.
   */
  setLoginStatus(isLoggedIn: boolean): void {
    this.sharedService.setSharedVariable(isLoggedIn);
    console.log(`isLogin wurde auf ${isLoggedIn} gesetzt.`);
  }
}
