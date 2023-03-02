import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinancasRoutingModule } from './financas-routing.module';
import { FinancasComponent } from "./financas.component";
import { CardModule } from "primeng/card";
import { ContasComponent } from './contas/contas.component';


@NgModule({
  declarations: [
    FinancasComponent,
    ContasComponent
  ],
  imports: [
    CommonModule,
    FinancasRoutingModule,
    CardModule
  ]
})
export class FinancasModule { }
