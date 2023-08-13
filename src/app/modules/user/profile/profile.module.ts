import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile.routing.module';
import { ProfileComponent } from "./profile.component";
import { ListProfileComponent } from "./list/list-profile.component";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { RippleModule } from "primeng/ripple";
import { TableModule } from "primeng/table";
import { SharedModule } from "../../../shared/shared.module";
import { TooltipModule } from "primeng/tooltip";


@NgModule({
  declarations: [
    ProfileComponent,
    ListProfileComponent,
  ],
    imports: [
        CommonModule,
        ProfileRoutingModule,
        ButtonModule,
        CardModule,
        RippleModule,
        TableModule,
        SharedModule,
        TooltipModule
    ]
})
export class ProfileModule { }
