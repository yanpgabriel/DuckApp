import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PontoComponent } from './ponto.component';
import { RouterModule, Routes } from "@angular/router";
import { FullCalendarModule } from "@fullcalendar/angular";

const routes: Routes = [
  {
    path: '',
    component: PontoComponent,
    data: {
      breadcrumb: 'system.menu.ponto'
    }
  }
];

@NgModule({
  declarations: [
    PontoComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FullCalendarModule
  ]
})
export class PontoModule { }
