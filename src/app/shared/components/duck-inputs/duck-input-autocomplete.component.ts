import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'duck-input-autocomplete',
  template: `
    <div class="field {{styleClass}}">
      <label for="input-autocomplete-{{id}}" class="block">{{label}}</label>
      <p-autoComplete field="label"
                      [suggestions]="options" [dropdown]="true" [multiple]="multiple" [ngModel]="_value"
                      (ngModelChange)="onChange($event)" (completeMethod)="completeMethod.emit($event)">
        <!--<ng-content></ng-content>-->
        <!--<ng-template let-country pTemplate="item">-->
        <!--  <div class="country-item">-->
        <!--    <div>{{country.label}}</div>-->
        <!--  </div>-->
        <!--</ng-template>-->
        <ng-container *ngTemplateOutlet="itemTemplate"></ng-container>
      </p-autoComplete>
      <small *ngIf="helpTxt" id="input-autocomplete-help-{{id}}" class="block">{{helpTxt}}</small>
    </div>
  `,
  styles: [
    `
    `
  ],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: DuckInputAutocompleteComponent },
  ]
})
export class DuckInputAutocompleteComponent implements ControlValueAccessor {

  @Input() id: string | number = 0;
  @Input() label: string = '';
  @Input() options: { label: string, value: any }[] = [];
  @Input() helpTxt: string = '';
  @Input() multiple: boolean = false;
  @Input() styleClass: string = '';
  @Input() itemTemplate: TemplateRef<any> | null = null;
  @Output() completeMethod: EventEmitter<any> = new EventEmitter();

  _value: any;
  onChange = (newValue) => {};
  onTouch = (newValue) => {};

  set value(val){
    this._value = val;
    this.onChange(val);
    this.onTouch(val);
  }

  writeValue(obj: any): void {
    this.value = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

}
