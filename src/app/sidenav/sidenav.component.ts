/*import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { SidenavLinksComponent } from "../sidenav-links/sidenav-links.component";
import { MatMenuModule } from '@angular/material/menu';
import {UserService} from "../services/UserService";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    AsyncPipe,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    SidenavLinksComponent
]
})
export class SidenavComponent {
  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );


  isLoggedIn = false;

  /*constructor(private userService: UserService, private cdRef: ChangeDetectorRef) {
    this.userService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
      this.cdRef.detectChanges(); // Erzwingt die UI-Aktualisierung
    });
  }

  constructor(private userService: UserService) {
    this.isLoggedIn = this.userService.isLoggedIn(); // Login-Status beim Laden prüfen
  }

  confirmLogout(): void {
    const confirmation = confirm('Sind Sie sich sicher, dass Sie sich ausloggen möchten?');
    if (confirmation) {
      this.userService.logout();
    }
  }
}*/

import { Component, inject, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { SidenavLinksComponent } from "../sidenav-links/sidenav-links.component";
import { MatMenuModule } from '@angular/material/menu';
import { UserService } from "../services/UserService";
import { Router } from "@angular/router";
import {MatLabel} from "@angular/material/form-field";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    SidenavLinksComponent,
    MatLabel
  ]
})
export class SidenavComponent implements OnInit {
  private breakpointObserver = inject(BreakpointObserver);
  userEmail: string = '';

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    // E-Mail aus der Session abrufen
    this.userService.fetchUserEmail();

    // Sobald sich die E-Mail ändert, wird sie automatisch in der UI aktualisiert
    this.userService.userEmail$.subscribe(email => {
      this.userEmail = email;
    });
  }

  confirmLogout(): void {
    const confirmation = confirm("Sind sie sich sicher, dass Sie sich ausloggen wollen?");
    if (confirmation) {
      this.userService.logout();
    }

  }

  /*confirmLogout(): void {
    const confirmation = confirm('Sind Sie sich sicher, dass Sie sich ausloggen möchten?');
    if (confirmation) {
      this.userService.logout();
      this.router.navigate(['/login']); // Nach Logout zur Login-Seite weiterleiten
    }
  }*/
}

