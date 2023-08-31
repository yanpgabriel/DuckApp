import { Component, Input } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validator } from '@angular/forms';

@Component({
  selector: 'duck-input-dropdown',
  template: `
    <div class="duck-field {{styleClass}}">
      <label for="input-dropdown-{{id}}" class="block">{{label}}</label>
      <p-dropdown optionLabel="label"
                  [placeholder]="placeholder" [options]="options" [showClear]="true" [ngModel]="_value"
                  (ngModelChange)="_onChange($event ? $event.value : undefined)"
      ></p-dropdown>
      <small *ngIf="helpTxt" id="input-dropdown-help-{{id}}" class="block">{{helpTxt}}</small>
    </div>
  `,
  styles: [``],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: DuckInputDropdownComponent },
    { provide: NG_VALIDATORS, multi: true, useExisting: DuckInputDropdownComponent }
  ],
})
export class DuckInputDropdownComponent implements Validator, ControlValueAccessor {

  _value: any;
  _onChange = (newValue) => {};
  _onTouch = (newValue) => {};

  @Input() id: string | number = 0;
  @Input() label: string = '';
  @Input() helpTxt: string = '';
  @Input() options: { label: string, value: any }[] = [];
  @Input() styleClass: string = '';
  @Input() placeholder: string = 'Selecione';

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

  set value(val){
    this._value = val;
    this._onChange(val);
    this._onTouch(val);
  }

  writeValue(obj: any): void {
    this.value = obj;
  }
  registerOnChange(fn: any): void {
    this._onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this._onTouch = fn;
  }

}
