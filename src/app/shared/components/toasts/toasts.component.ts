import {Component, OnInit, TemplateRef} from '@angular/core';

@Component({
  selector: 'duck-toasts',
  template: `
    <!--<ngb-toast-->
    <!--  *ngFor="let toast of toastService.toasts"-->
    <!--  [class]="toast.classname"-->
    <!--  [autohide]="toast.autohide"-->
    <!--  (mouseenter)="toast.autohide = false"-->
    <!--  (mouseleave)="toast.autohide = true"-->
    <!--  [delay]="toast.delay"-->
    <!--  (hidden)="toast.autohide = true; toastService.remove(toast);"-->
    <!--&gt;-->
    <!--  &lt;!&ndash; Header desativado porque tava feio &ndash;&gt;-->
    <!--  &lt;!&ndash;<ng-template ngbToastHeader><strong>{{toast.type}}</strong></ng-template>&ndash;&gt;-->

    <!--  <ng-template [ngIf]="isTemplate(toast)" [ngIfElse]="text">-->
    <!--    <ng-template [ngTemplateOutlet]="toast.textOrTpl"></ng-template>-->
    <!--  </ng-template>-->

    <!--  <ng-template #text>{{ toast.textOrTpl | translate }}</ng-template>-->
    <!--</ngb-toast>-->
  `,
  styles: [`
    :host {
      position: fixed;
      top: 0;
      right: 0;
      margin: 0.5em;
      z-index: 1200;
    }
  `]
})
export class ToastsComponent implements OnInit {

  constructor(
    // public toastService: ToastService
  ) { }

  ngOnInit(): void {}

  isTemplate(toast: { textOrTpl: string | TemplateRef<any>; }): boolean {
    return toast.textOrTpl instanceof TemplateRef;
  }

}
