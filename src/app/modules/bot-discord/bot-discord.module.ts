import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BotDiscordComponent } from './bot-discord.component';
import { BotDiscordRountingModule } from './bot-discord.routing.module';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatLegacyOptionModule as MatOptionModule } from '@angular/material/legacy-core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    BotDiscordComponent
  ],
  imports: [
    CommonModule,
    BotDiscordRountingModule,
    MatSelectModule,
    MatOptionModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    DropdownModule,
    ButtonModule,
    SharedModule,
  ]
})
export class BotDiscordModule { }
