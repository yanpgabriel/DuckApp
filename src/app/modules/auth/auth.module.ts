import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthRoutingModule} from './auth-routing.module';
import {AuthComponent} from './auth.component';
import {TranslateModule} from '@ngx-translate/core';
import {ButtonModule} from 'primeng/button';


@NgModule({
  declarations: [
    AuthComponent
  ],
    imports: [
        CommonModule,
        AuthRoutingModule,
        TranslateModule,
        ButtonModule
    ]
})
export class AuthModule { }
