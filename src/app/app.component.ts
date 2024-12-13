import {MatCommonModule} from '@angular/material/core';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidenavComponent } from "./sidenav/sidenav.component";
import { RouterModule } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from "@angular/material/icon";
import { CommonModule } from '@angular/common';
import { NgxPaypalComponent, NgxPayPalModule } from 'ngx-paypal';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidenavComponent, RouterModule, MatTooltipModule, MatCommonModule, MatIconModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Reseller Portal';

}
