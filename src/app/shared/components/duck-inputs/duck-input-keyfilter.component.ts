import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'duck-input-keyfilter',
  template: `
    <div class="field {{styleClass}}">
      <form #form="ngForm">
        <label for="input-keyfilter-{{id}}" class="block">{{label}}</label>
        <input id="input-keyfilter-{{id}}" type="text" [(ngModel)]="value" pInputText [pKeyFilter]="regex" [pValidateOnly]="true" placeholder="" style="margin-right: .5em">
        <p-message severity="error" text="Not a valid number" [@errorState]="form.dirty && !form.valid ? 'visible' : 'hidden'"></p-message>
        <small *ngIf="helpTxt" id="input-text-help-{{id}}" class="block">{{helpTxt}}</small>
      </form>
    </div>
  `,
  styles: [
    `
    `
  ]
})
export class DuckInputKeyFilterComponent implements OnInit {

  @Input() id: string | number = 0;
  @Input() helpTxt: string = '';
  @Input() label: string = '';
  @Input() styleClass: string = '';
  @Input() regex: RegExp = /$/;
  value: string = '';

  constructor(
  ) { }

  ngOnInit(): void {
  }

}
