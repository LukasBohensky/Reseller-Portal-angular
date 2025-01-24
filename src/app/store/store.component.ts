import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { SidenavLinksComponent } from '../sidenav-links/sidenav-links.component';
import { NgIf } from '@angular/common';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { HttpClient } from '@angular/common/http';
import { SharedService } from '../shared/sharedIsLoggedIn';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormService } from '../services/FormServices';
interface RequestData {
  name: string;
  adress: string;
}

@Component({
  selector: 'app-store',
  standalone: true,
  imports: [
    MatButtonModule,
    MatSelectModule,
    MatOptionModule,
    MatStepperModule,
    FormsModule,
    NgIf,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    SidenavLinksComponent,
  ],
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css'],
})

export class StoreComponent {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  showPayment: boolean = false;

  constructor(private _formBuilder: FormBuilder, private http: HttpClient, private sharedService: SharedService) {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });

    this.secondFormGroup = this._formBuilder.group({
      anrede: ['', Validators.required],
      kontaktperson: ['', Validators.required],
      anschrift: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefonnummer: ['', [Validators.pattern(/^\+?[0-9\s-]{11,13}$/)]],
      domainName: ['', [Validators.required, Validators.pattern('[a-z0-9]+')]]
    });
  }

  onSave(): void {
    console.log('First Form Valid:', this.firstFormGroup.valid, this.firstFormGroup.value);
    console.log('Second Form Valid:', this.secondFormGroup.valid, this.secondFormGroup.value);
    if (this.firstFormGroup.valid && this.secondFormGroup.valid) {

      const customerData = {
        name: this.firstFormGroup.get('firstCtrl')?.value,
        anrede: this.secondFormGroup.get('anrede')?.value,
        kontaktperson: this.secondFormGroup.get('kontaktperson')?.value,
        anschrift: this.secondFormGroup.get('anschrift')?.value,
        email: this.secondFormGroup.get('email')?.value,
        telefonnummer: this.secondFormGroup.get('telefonnummer')?.value,
        domainName: `${this.secondFormGroup.value.domainName}.unload.work`
      };

      this.http.post('http://localhost:3000/save-form', customerData, { withCredentials: true }).subscribe({
        next: () => {
          alert('Kundeninformationen erfolgreich gespeichert!');
          this.showPayment = true;
        },
        error: (error) => {
          alert(`Fehler beim Speichern: ${error.error.message}`);
        }
      });
    } else {
      alert('Bitte alle Pflichtfelder ausfüllen!');
    }
  }

  /*processPayment(paymentData: any): void {
    if (!paymentData.fullname || !paymentData.cardNumber || !paymentData.expiryDate || !paymentData.cvv) {
      alert('Bitte alle Zahlungsinformationen ausfüllen!');
      return;
    }

    this.http.post('/process-payment', paymentData).subscribe({
      next: (response: any) => {
        alert('Zahlung erfolgreich verarbeitet!');
        this.showPayment = false; // Schließt das Zahlungsformular
      },
      error: (error) => {
        alert(`Fehler bei der Zahlung: ${error.error.message}`);
      }
    });
  }

  validateDomain(domainName: string): void {
    this.http.post('/validate-domain', { domainName }).subscribe({
      next: (response: any) => {
        alert('Domain ist verfügbar.');
      },
      error: (error) => {
        alert(`Fehler bei der Domain-Validierung: ${error.error.message}`);
      }
    });
  }*/
}



/*export class StoreComponent {

  showPayment?: boolean;

  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private sharedService: SharedService,
    private formService: FormService,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      anrede: [''],
      kontaktperson: [''],
      anschrift: [''],
      email: ['', [Validators.required, Validators.email]],
      telefonnummer: [''],
      domainName: ['', [Validators.required, Validators.pattern('[a-z0-9]+')]],
    });
  }

  isLinear = false;









  /*onSave(): void {
    if (this.firstFormGroup.valid && this.secondFormGroup.valid) {
      const creationDate = new Date();
      const day = String(creationDate.getDate()).padStart(2, '0');
      const month = String(creationDate.getMonth() + 1).padStart(2, '0');
      const year = creationDate.getFullYear();

      const formattedDate = `${day}.${month}.${year}`;
      const formValues = {
        status: 'in progress',
        name: this.firstFormGroup.value.firstCtrl,
        anrede: this.secondFormGroup.value.anrede,
        kontaktperson: this.secondFormGroup.value.kontaktperson,
        anschrift: this.secondFormGroup.value.anschrift,
        email: this.secondFormGroup.value.email,
        telefonnummer: this.secondFormGroup.value.telefonnummer,
        domainName: `${this.secondFormGroup.value.domainName}.unload.work`,
        creationDate: formattedDate,
      };
      this.sharedService.updateFormValues(formValues);
      console.log(formValues);
      this.formService.saveForm(formValues).subscribe({
        next: (response) => {
            // bei gutem erfolg eine snackbar öffnen
            this.showPayment = true;
            this.snackBar.open('Instanz wurde gespeichert!', 'Schließen', { duration: 6000 });

        },
        error: (error) => {
          if (error.status === 400) {
            const errormessage = 'Instanzdomain ist bereits vergeben! Bitte wählen Sie eine andere Domain.';
            this.snackBar.open(errormessage, 'Schließen', { duration: 6000 });
          } else {
          // Handle unexpected errors
          console.error('Error saving form:', error);
          this.snackBar.open('Ein Fehler ist passiert beim Speichern der Instanz. Probiere es erneut!', 'Schließen', { duration: 6000 });
        }}
      });
    }
  }
}*/
