import { Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'duck-input-editor',
  template: `
    <div class="field {{styleClass}}">
      <label for="input-editor-{{id}}" class="block">{{label}}</label>
      <p-editor [style]="{'height':'320px'}" [ngModel]="_value"
                (ngModelChange)="onChange($event)"></p-editor>
      <small *ngIf="helpTxt" id="input-editor-help-{{id}}" class="block">{{helpTxt}}</small>
    </div>
  `,
  styles: [
    `
    `
  ],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: DuckInputEditorComponent },
  ]
})
export class DuckInputEditorComponent implements ControlValueAccessor {

  @Input() id: string | number = 0;
  @Input() helpTxt: string = '';
  @Input() label: string = '';
  @Input() styleClass: string = '';

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
