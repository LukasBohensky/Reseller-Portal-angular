import { Component } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SidenavComponent } from "../sidenav/sidenav.component";
@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    MatSlideToggleModule,
    SidenavComponent
],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

}
