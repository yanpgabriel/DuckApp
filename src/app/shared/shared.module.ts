import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MenuComponent } from './components/menu/menu.component';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InputTextComponent } from './components/inputs/input-text.component';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputEditorComponent } from './components/inputs/input-editor.component';
import { EditorModule } from 'primeng/editor';
import { InputKeyFilterComponent } from './components/inputs/input-keyfilter.component';
import { KeyFilterModule } from 'primeng/keyfilter';
import { MessageModule } from 'primeng/message';
import { InputDropdownComponent } from './components/inputs/input-dropdown.component';
import { DropdownModule } from 'primeng/dropdown';
import { InputAutocompleteComponent } from './components/inputs/input-autocomplete.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { TerminalComponent } from './components/terminal/terminal.component';
import { LoadingComponent } from './components/loading/loading.component';
import { MatLegacyProgressBarModule as MatProgressBarModule } from '@angular/material/legacy-progress-bar';
import { ProgressBarModule } from 'primeng/progressbar';
import { InputTextPassComponent } from "./components/inputs/input-text-pass.component";
import { PasswordModule } from "primeng/password";

@NgModule({
  declarations: [
    MenuComponent,
    InputAutocompleteComponent,
    InputDropdownComponent,
    InputEditorComponent,
    InputKeyFilterComponent,
    InputTextComponent,
    InputTextPassComponent,
    TerminalComponent,
    LoadingComponent,
  ],
  exports: [
    MenuComponent,
    InputAutocompleteComponent,
    InputDropdownComponent,
    InputEditorComponent,
    InputKeyFilterComponent,
    InputTextComponent,
    InputTextPassComponent,
    TerminalComponent,
    LoadingComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule,
    ButtonModule,
    RippleModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    EditorModule,
    KeyFilterModule,
    MessageModule,
    DropdownModule,
    AutoCompleteModule,
    MatProgressBarModule,
    ProgressBarModule,
    PasswordModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule {
}
