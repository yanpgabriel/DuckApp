import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'duck-float-button',
  template: `
    <a [routerLink]="routerLink" pRipple class="duck-float-button styled-box-green">
      <ng-content></ng-content>
    </a>
  `,
  styles: [
    `
      .duck-float-button {
        display: flex;
        width: 8rem;
        height: 8rem;
        border-radius: 50%;
        justify-content: center;
        align-items: center;
        background-color: var(--primary-color);
        color: var(--primary-color-text);
        cursor: pointer;
        text-decoration: none;
        font-size: 2.5rem;
      }
    `
  ]
})
export class FloatButtonComponent implements OnInit {

  @Input() routerLink: any[] | string | null | undefined

  constructor() {
  }

  ngOnInit(): void {
  }

}
