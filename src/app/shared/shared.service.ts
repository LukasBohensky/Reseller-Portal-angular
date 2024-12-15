import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private formValuesSource = new BehaviorSubject<any>({});
  currentFormValues = this.formValuesSource.asObservable();

  updateFormValues(values: any) {
    this.formValuesSource.next(values);
  }
}