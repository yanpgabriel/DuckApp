import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinancasRoutingModule } from './financas-routing.module';
import { FinancasComponent } from "./financas.component";
import { CardModule } from "primeng/card";
import { FinancasContasComponent } from './financas-contas/financas-contas.component';
import { ButtonModule } from "primeng/button";
import { FinancasDashboardComponent } from './financas-dashboard/financas-dashboard.component';
import { SkeletonModule } from "primeng/skeleton";


@NgModule({
  declarations: [
    FinancasComponent,
    FinancasContasComponent,
    FinancasDashboardComponent
  ],
    imports: [
        CommonModule,
        FinancasRoutingModule,
        CardModule,
        ButtonModule,
        SkeletonModule
    ]
})
export class FinancasModule { }
