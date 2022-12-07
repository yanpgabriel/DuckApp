import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BotDiscordComponent} from './bot-discord.component';
import {BotDiscordRountingModule} from './bot-discord.routing.module';
import {MatSelectModule} from '@angular/material/select';
import {MatOptionModule} from '@angular/material/core';
import {FormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {DropdownModule} from 'primeng/dropdown';
import {ButtonModule} from 'primeng/button';
import {SharedModule} from '../../shared/shared.module';

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
