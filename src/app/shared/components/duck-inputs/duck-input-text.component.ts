import { Component, Input, } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validator } from '@angular/forms';
import { GenericFunction, notImplemented } from "../../util";

@Component({
  selector: 'duck-input-text',
  template: `
    <div class="duck-field {{styleClass}}">
      <label for="input-text-{{id}}" class="block">{{label}}</label>
      <input id="input-text-{{id}}" type="username" [attr.aria-describedby]="'input-text-help-' + id"
             [(ngModel)]="value" (input)="input($event)"
             pInputText />
      <small *ngIf="helpTxt" id="input-text-help-{{id}}" class="block">{{helpTxt}}</small>
    </div>
  `,
  styles: [
    `
    `
  ],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: DuckInputTextComponent },
    { provide: NG_VALIDATORS, multi: true, useExisting: DuckInputTextComponent }
  ]
})
export class DuckInputTextComponent implements ControlValueAccessor, Validator {

  value = '';

  @Input() id: string | number = 0;
  @Input() helpTxt = '';
  @Input() label = '';
  @Input() styleClass = '';

  onChange: GenericFunction<unknown> = notImplemented;
  onTouched: GenericFunction<never> = notImplemented;
  touched = false;
  disabled = false;

  input(event) {
    this.onChange(event.target.value);
  }

  writeValue(newValue: string): void {
    this.value = newValue;
  }
  registerOnChange(fn: GenericFunction<unknown>): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: GenericFunction<never>): void {
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
