import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MinecraftRoutingModule } from './minecraft-routing.module';
import { MinecraftComponent } from './minecraft.component';
import { ProgressBarModule } from "primeng/progressbar";
import { PaperMcComponent } from './papermc/paper-mc.component';
import { DropdownModule } from "primeng/dropdown";
import { FormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";


@NgModule({
  declarations: [
    MinecraftComponent,
    PaperMcComponent
  ],
  imports: [
    CommonModule,
    MinecraftRoutingModule,
    ProgressBarModule,
    DropdownModule,
    FormsModule,
    ButtonModule,
    CardModule
  ]
})
export class MinecraftModule { }
