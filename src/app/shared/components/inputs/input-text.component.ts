import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validator} from '@angular/forms';

@Component({
  selector: 'duck-input-text',
  template: `
    <div class="field {{styleClass}}">
      <label for="input-text-{{id}}" class="block">{{label}}</label>
      <input id="input-text-{{id}}" type="username" [attr.aria-describedby]="'input-text-help-' + id"
             [value]="value" (change)="change($event)"
             pInputText />
             <!--[ngModel]="value" (ngModelChange)="valueChange.emit($event)"/>-->
      <small *ngIf="helpTxt" id="input-text-help-{{id}}" class="block">{{helpTxt}}</small>
    </div>
  `,
  styles: [
    `
    `
  ],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: InputTextComponent },
    { provide: NG_VALIDATORS, multi: true, useExisting: InputTextComponent }
  ]
})
export class InputTextComponent implements OnInit, ControlValueAccessor, Validator {

  value: string = '';

  @Input() id: string | number = 0;
  @Input() helpTxt: string = '';
  @Input() label: string = '';
  @Input() styleClass: string = '';

  onChange = (value) => {};
  onTouched = () => {};
  touched = false;
  disabled = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  log(obj) {
    console.log(obj.target.value);
  }

  change(event) {
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
