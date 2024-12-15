import { Component } from '@angular/core';
import { SidenavLinksComponent } from '../sidenav-links/sidenav-links.component';
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [SidenavLinksComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

}
