import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { MatLabel } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButton } from '@angular/material/button';


@Component({
  selector: 'app-deactivate-dialog',
  standalone: true,
  imports: [MatFormField, MatButton, MatLabel, FormsModule, MatInputModule, MatDialogTitle, MatDialogContent, MatDialogActions],
  template: `
  <div style="margin: 20px;">
      <h2 mat-dialog-title>Deaktivieren</h2>
      <div mat-dialog-content>
        <p>Möchten Sie die Instanz mit dem Hostnamen "{{data.domainName}}" wirklich deaktivieren?</p>
        <mat-form-field>
          <mat-label>Hostname eingeben</mat-label>
          <input matInput [(ngModel)]="enteredHostname" (ngModelChange)="validateHostname()" required>
        </mat-form-field>
      </div>
      <div mat-dialog-actions>
        <button mat-button (click)="deactivate()" [disabled]="!isHostnameValid">Bestätigen</button>
        <button mat-button (click)="close()">Abbrechen</button>
      </div>
    </div>
  `,
  styles: ''
})
export class DeactivateDialogComponent {
  enteredHostname: string = ''; // Stores the user's input
  isHostnameValid: boolean = false; // Tracks if the input matches the hostname

  constructor(
      @Inject(MAT_DIALOG_DATA) public data: any, // Inject data passed to the dialog
      private dialogRef: MatDialogRef<DeactivateDialogComponent> // Inject MatDialogRef
    ) {}

  validateHostname() {
    this.isHostnameValid = this.enteredHostname === this.data.domainName;
  }

  deactivate() {
    // Logik zur Deaktivierung der Instanz
    this.dialogRef.close(true);
  }

  close() {
    // Schließen des Dialogs
    this.dialogRef.close(false);
  }
}
