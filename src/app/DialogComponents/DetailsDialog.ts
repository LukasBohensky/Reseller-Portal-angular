import { Component, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogTitle,
  MatDialogContent
} from '@angular/material/dialog';
import { UserService } from '../services/UserService';
import * as bcrypt from 'bcryptjs';
import { PasswordpromptComponent } from '../passwordprompt/passwordprompt.component';
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-details-dialog',
  standalone: true,
  imports: [
    MatIcon,
    MatIconButton,
    MatDialogActions,
    MatButton,
    MatDialogTitle,
    MatDialogContent,
    NgIf
  ],
  template: `
    <div class="details-dialog">
      <h2 mat-dialog-title>Details</h2>
      <div mat-dialog-content>
        <p>Status: {{data.status}}</p>
        <p>Anrede: {{data.anrede}}</p>
        <p>Kontaktperson: {{data.kontaktperson}}</p>
        <p>Anschrift: {{data.anschrift}}</p>
        <p>Telefonnummer: {{data.telefonnummer}}</p>
        <p>Erstellungsdatum: {{data.creationDate}}</p>
        <p>Kundenname: {{data.name}}</p>
        <p>Hostname: {{data.domainName}}</p>
        <p>E-Mail Adresse: {{data.email}}</p>
        <p>init_username: {{data.init_username}}</p>
        <div class="form-group">
          <input
            type="password"
            id="init_password"
            class="form-input"
            placeholder="init_password"
            [type]="hideInitPassword ? 'password' : 'text'"
            [value]="data.init_password"
            readonly
          />
          <button
            type="button"
            mat-icon-button
            (click)="promptUserPassword()"
            [attr.aria-label]="'Hide password'"
            [attr.aria-pressed]="hideInitPassword"
          >
            <mat-icon>{{ hideInitPassword ? 'visibility_off' : 'visibility' }}</mat-icon>
          </button>
        </div>
        <p *ngIf="passwordError" class="error-message">Incorrect password</p>
      </div>
      <div mat-dialog-actions>
        <button mat-button (click)="close()">Schließen</button>
      </div>
    </div>
  `,
  styles: [`
    .details-dialog {
      margin: 20px;
      font-family: Arial, sans-serif;
    }
    .form-group {
      display: flex;
      align-items: center;
      margin-top: 10px;
    }
    .form-input {
      flex: 1;
      margin-right: 10px;
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    .error-message {
      color: red;
      margin-top: 10px;
    }
    mat-dialog-actions {
      display: flex;
      justify-content: flex-end;
      margin-top: 20px;
    }
  `]
})
export class DetailsDialogComponent {
  hideInitPassword: boolean = true;
  passwordError: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DetailsDialogComponent>,
    private userService: UserService,
    private dialog: MatDialog
  ) {
    this.userService.fetchUserPassword();
  }

  promptUserPassword() {
    const dialogRef = this.dialog.open(PasswordpromptComponent);

    dialogRef.afterClosed().subscribe(async (enteredPassword: string) => {
      console.log('Password entered:', enteredPassword);
      if (enteredPassword) {
        const correctPassword = this.userService.getPassword();
        const isPasswordValid = await bcrypt.compare(enteredPassword, correctPassword);
        console.log('Is password valid:', isPasswordValid);
        if (isPasswordValid) {
          this.hideInitPassword = false;
          this.passwordError = false;
        } else {
          this.passwordError = true;
        }
      }
    });
  }

  close() {
    this.dialogRef.close();
  }
}

/*import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-details-dialog',
  standalone: true,
  imports: [MatButton, MatDialogTitle, MatDialogContent, MatDialogActions],
  template: `
  <div style="margin: 20px;">
    <h2 mat-dialog-title>Details</h2>
    <div mat-dialog-content>
      <p>Status: {{data.status}}</p>
      <p>Anrede: {{data.anrede}}</p>
      <p>Kontaktperson: {{data.kontaktperson}}</p>
      <p>Anschrift: {{data.anschrift}}</p>
      <p>Telefonnummer: {{data.telefonnummer}}</p>
      <p>Erstellungsdatum: {{data.creationDate}}</p>
      <p>Kundenname: {{data.name}}</p>
      <p>Hostname: {{data.domainName}}</p>
      <p>E-Mail Adresse: {{data.email}}</p>
      <p>init_username: {{data.init_username}}</p>

      <p>init_password: {{data.init_password}}</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="close()">Schließen</button>
    </div>
</div>
  `
})
export class DetailsDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, // Inject data passed to the dialog
    private dialogRef: MatDialogRef<DetailsDialogComponent> // Inject MatDialogRef
  ) {}

  close() {
    this.dialogRef.close();
  }
}*/
