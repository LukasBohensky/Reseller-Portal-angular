import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-details-dialog',
  standalone: true,
  imports: [MatButton],
  template: `
  <div style="margin: 20px;">
    <h1 mat-dialog-title>Details</h1>
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
}