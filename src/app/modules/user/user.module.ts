import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListUserComponent} from './list/list-user.component';
import {UserRoutingModule} from './user.routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CreateUserComponent} from './create/create-user.component';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {RippleModule} from 'primeng/ripple';

@NgModule({
  declarations: [
    ListUserComponent,
    CreateUserComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    TableModule,
    ButtonModule,
    RippleModule
  ]
})
export class UserModule { }
