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
import { SharedService } from '../shared/shared.service'; // Import the service
import { SidenavLinksComponent } from '../sidenav-links/sidenav-links.component';
import { NgIf } from '@angular/common';
/*import {
  NgxPayPalModule,
  IPayPalConfig,
  ICreateOrderRequest,
} from 'ngx-paypal';*/

interface RequestData {
  name: string;
  adress: string;
}


@Component({
  selector: 'app-store',
  standalone: true,
  imports: [
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    NgIf,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    SidenavLinksComponent,
  ],
  templateUrl: './store.component.html',
  styleUrl: './store.component.css',
})
export class StoreComponent {

  showPayment?: boolean;

  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;

  // constructor damit wir den gleichen Service überall nutzen können
  constructor(
    private _formBuilder: FormBuilder,
    private sharedService: SharedService
  ) {}

  // initiiert die Forms (man muss in beiden Forms etwas eingeben)
  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
  }
  isLinear = false;

  onSave() {
    this.showPayment = true;
    if (this.firstFormGroup.valid && this.secondFormGroup.valid) {
      // macht ein objekt um dieses dann leichter zu verschicken bzw überhaupt an home component zu schicken
      const formValues = {
        first: this.firstFormGroup.value.firstCtrl,
        second: this.secondFormGroup.value.secondCtrl,
      };
      const data: RequestData = {
        name: this.firstFormGroup.value.firstCtrl,
        adress: this.secondFormGroup.value.secondCtrl
      }

      const sendPostRequest = async (): Promise<void> => {
        try {
            const response = await fetch('http://localhost:3000/instances/data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            //const result: ResponseData = await response.json(); // Parse JSON response as ResponseData
            //console.log('Response from server:', await response.json());
        } catch (error) {
            console.error('Error:', error);
        }
    };
    sendPostRequest();
      this.sharedService.updateFormValues(formValues);
      console.log('Form Submitted!', formValues);
    }
  }
}
