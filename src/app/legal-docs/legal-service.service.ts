import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LegalServiceService {
  form_state: Number;

  formStateChange: Subject<Number> = new Subject<Number>();

  constructor() {
    this.formStateChange.subscribe((v) => {
      this.form_state = v;
    });
  }

  changeFormState() {
    this.formStateChange.next();
  }
}
