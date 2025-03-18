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
import { MatInput } from '@angular/material/input';
import { FormsModule, NgModel } from '@angular/forms';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-edit-dialog',
  standalone: true,
  imports: [MatFormField, MatLabel, MatInput, FormsModule, MatButton, MatDialogTitle, MatDialogContent, MatDialogActions],
  template: `
  <div style="margin: 20px;">
    <h2 mat-dialog-title>Bearbeiten</h2>
    <div mat-dialog-content>
      <mat-form-field>
        <mat-label>Kundenname</mat-label>
        <input matInput [(ngModel)]="data.name">
      </mat-form-field><br>
      <mat-form-field>
        <mat-label>E-Mail Adresse</mat-label>
        <input matInput [(ngModel)]="data.email">
      </mat-form-field><br>
      <mat-form-field>
        <mat-label>Kontaktperson</mat-label>
        <input matInput [(ngModel)]="data.name">
      </mat-form-field><br>
      <mat-form-field>
        <mat-label>Anschrift</mat-label>
        <input matInput [(ngModel)]="data.anschrift">
      </mat-form-field><br>
      <mat-form-field>
        <mat-label>Telefonnummer</mat-label>
        <input matInput [(ngModel)]="data.telefonnummer">
      </mat-form-field><br>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="save()">Speichern</button>
      <button mat-button (click)="close()">Abbrechen</button>
    </div>
</div>
  `
})
export class EditDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, // Inject data passed to the dialog
    private dialogRef: MatDialogRef<EditDialogComponent> // Inject MatDialogRef
  ) {}
  save(): void {
    console.log('Geänderte Daten:', this.data);
    this.dialogRef.close(this.data); // Gibt die geänderten Daten zurück
  }

  close() {
    this.dialogRef.close();
  }
}

//type="number" min="11"
