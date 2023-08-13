import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListUserComponent } from './list/list-user.component';
import { UserRoutingModule } from './user.routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateUserComponent } from './create/create-user.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { UserComponent } from "./user.component";
import { CardModule } from "primeng/card";
import { InputTextModule } from "primeng/inputtext";
import { PasswordModule } from "primeng/password";
import { DropdownModule } from "primeng/dropdown";
import { SharedModule } from "../../shared/shared.module";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { TooltipModule } from "primeng/tooltip";

@NgModule({
  declarations: [
    UserComponent,
    ListUserComponent,
    CreateUserComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    ConfirmDialogModule,
    TableModule,
    ButtonModule,
    RippleModule,
    CardModule,
    InputTextModule,
    PasswordModule,
    DropdownModule,
    SharedModule,
    TooltipModule
  ]
})
export class UserModule { }
