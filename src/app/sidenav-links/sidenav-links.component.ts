import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatListItem } from '@angular/material/list';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sidenav-links',
  standalone: true,
  imports: [RouterLink, MatListItem],
  templateUrl: './sidenav-links.component.html',
  styleUrl: './sidenav-links.component.css'
})
export class SidenavLinksComponent {
  @Input()
  routerLink?: string;

  constructor(private router: Router) {}


  @Input()
  routerLinkActiveOptions: { exact: boolean } = { exact: false };

  isActive(): boolean {
    return this.router.url === this.routerLink;
  }
}
