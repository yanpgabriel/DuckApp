import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { DuckInputTextComponent } from './components/duck-inputs/duck-input-text.component';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DuckInputEditorComponent } from './components/duck-inputs/duck-input-editor.component';
import { EditorModule } from 'primeng/editor';
import { DuckInputKeyFilterComponent } from './components/duck-inputs/duck-input-keyfilter.component';
import { KeyFilterModule } from 'primeng/keyfilter';
import { MessageModule } from 'primeng/message';
import { DuckInputDropdownComponent } from './components/duck-inputs/duck-input-dropdown.component';
import { DropdownModule } from 'primeng/dropdown';
import { DuckInputAutocompleteComponent } from './components/duck-inputs/duck-input-autocomplete.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DuckTerminalComponent } from './components/duck-terminal/duck-terminal.component';
import { DuckLoadingComponent } from './components/duck-loading/duck-loading.component';
import { MatLegacyProgressBarModule as MatProgressBarModule } from '@angular/material/legacy-progress-bar';
import { ProgressBarModule } from 'primeng/progressbar';
import { DuckInputTextPassComponent } from "./components/duck-inputs/duck-input-text-pass.component";
import { PasswordModule } from "primeng/password";
import { DuckFloatButtonComponent } from "./components/duck-float-button/duck-float-button.component";
import { DuckLayoutComponent } from './components/duck-layout/duck-layout.component';
import { BreadcrumbModule } from "primeng/breadcrumb";
import { DuckListComponent } from "./components/duck-list/duck-list.component";
import { DuckMenuComponent } from './components/duck-menu/duck-menu.component';
import { AvatarModule } from "primeng/avatar";
import { MenuModule } from "primeng/menu";

@NgModule({
  declarations: [
    DuckListComponent,
    DuckInputAutocompleteComponent,
    DuckInputDropdownComponent,
    DuckInputEditorComponent,
    DuckInputKeyFilterComponent,
    DuckInputTextComponent,
    DuckInputTextPassComponent,
    DuckFloatButtonComponent,
    DuckTerminalComponent,
    DuckLoadingComponent,
    DuckLayoutComponent,
    DuckMenuComponent,
  ],
  exports: [
    DuckListComponent,
    DuckInputAutocompleteComponent,
    DuckInputDropdownComponent,
    DuckInputEditorComponent,
    DuckInputKeyFilterComponent,
    DuckInputTextComponent,
    DuckInputTextPassComponent,
    DuckFloatButtonComponent,
    DuckTerminalComponent,
    DuckLoadingComponent,
    DuckLayoutComponent,
    DuckMenuComponent,
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
    PasswordModule,
    BreadcrumbModule,
    AvatarModule,
    MenuModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule {
}
