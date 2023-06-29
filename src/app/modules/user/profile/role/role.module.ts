import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoleRoutingModule } from './role.routing.module';
import { RoleComponent } from "./role.component";
import { ListRoleComponent } from "./list/list-role.component";
import { CardModule } from "primeng/card";
import { SharedModule } from "primeng/api";
import { TableModule } from "primeng/table";


@NgModule({
  declarations: [
    RoleComponent,
    ListRoleComponent
  ],
  imports: [
    CommonModule,
    RoleRoutingModule,
    CardModule,
    SharedModule,
    TableModule
  ]
})
export class RoleModule { }
