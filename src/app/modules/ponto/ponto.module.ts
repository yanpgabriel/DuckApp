import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PontoComponent } from './ponto.component';
import { RouterModule, Routes } from "@angular/router";
import { FullCalendarModule } from "@fullcalendar/angular";

import { CalendarModule } from "primeng/calendar";
import { FormsModule } from "@angular/forms";
import { TimelineModule } from "primeng/timeline";
import { RippleModule } from "primeng/ripple";
import { InputSwitchModule } from "primeng/inputswitch"; // a plugin!

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
    FullCalendarModule,
    CalendarModule,
    FormsModule,
    TimelineModule,
    RippleModule,
    InputSwitchModule
  ]
})
export class PontoModule { }
