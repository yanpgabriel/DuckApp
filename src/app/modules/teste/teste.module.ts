import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TesteRoutingModule} from './teste-routing.module';
import {TesteComponent} from './teste.component';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {RippleModule} from 'primeng/ripple';


@NgModule({
  declarations: [
    TesteComponent
  ],
  imports: [
    CommonModule,
    TesteRoutingModule,
    CardModule,
    ButtonModule,
    RippleModule
  ]
})
export class TesteModule { }
