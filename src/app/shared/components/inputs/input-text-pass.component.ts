import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validator } from '@angular/forms';

@Component({
  selector: 'duck-input-text-pass',
  template: `
    <div class="duck-field {{styleClass}}">
      <label for="input-text-pass-{{id}}" class="block">{{label}}</label>
      <p-password id="input-text-pass-{{id}}"
                  styleClass="w-full p-password p-component p-inputwrapper p-input-icon-right"
                  [(ngModel)]="value" (input)="input($event)"
                  [attr.aria-describedby]="'input-text-help-' + id"
                  [feedback]="feedback"
                  [toggleMask]="toggleMask"
      ></p-password>
      <small *ngIf="helpTxt" id="input-text-help-{{id}}" class="block">{{helpTxt}}</small>
    </div>
  `,
  styles: [
    `
    `
  ],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: InputTextPassComponent },
    { provide: NG_VALIDATORS, multi: true, useExisting: InputTextPassComponent }
  ]
})
export class InputTextPassComponent implements OnInit, ControlValueAccessor, Validator {

  value: string = '';

  @Input() id: string | number = 0;
  @Input() helpTxt: string = '';
  @Input() label: string = '';
  @Input() styleClass: string = '';
  @Input() feedback: boolean = false;
  @Input() toggleMask: boolean = false;

  onChange = (value) => {};
  onTouched = () => {};
  touched = false;
  disabled = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  input(event) {
    this.onChange(event.target.value);
  }

  writeValue(newValue: string): void {
    this.value = newValue;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  validate(control: AbstractControl): any {
    const valor = control.value;
    if (valor == '' || valor == undefined) {
      return {
        empty: {
          valor
        }
      };
    }
  }

}
