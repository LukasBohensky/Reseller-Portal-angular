import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidenav-links',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sidenav-links.component.html',
  styleUrl: './sidenav-links.component.css'
})
export class SidenavLinksComponent {
  @Input()
  routerLink?: string;

  @Input()
  routerLinkActiveOptions: { exact: boolean } = { exact: false };
}
