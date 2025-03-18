import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  selector: 'app-instance-dialog',
  standalone: true,
  imports: [CommonModule, MatFormField, MatButton, MatLabel, FormsModule, MatInputModule, MatDialogTitle, MatDialogContent, MatDialogActions],
  templateUrl: './instance-dialog.component.html',
  styleUrl: './instance-dialog.component.css'
})
export class InstanceDialogComponent {
  enteredHostname: string = ''; // Stores the user's input
  isHostnameValid: boolean = false; // Tracks if the input matches the hostname

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, // Inject data passed to the dialog
    private dialogRef: MatDialogRef<InstanceDialogComponent> // Inject MatDialogRef
  ) {}

  validateHostname() {
    this.isHostnameValid = this.enteredHostname === this.data.instance.domainName;
  }

  submit() {

    this.dialogRef.close(true);

  }

  abort() {

    this.dialogRef.close(false);

  }

}
