import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from "primeng/api";
import { UtilsService } from "../../services/utils.service";
import { AuthService } from "../../services/auth.service";
import { TemaService } from "../../services/tema.service";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { DuckLayoutComponent } from "../duck-layout/duck-layout.component";

@Component({
  selector: 'duck-menu',
  templateUrl: './duck-menu.component.html',
  styleUrls: ['./duck-menu.component.css']
})
export class DuckMenuComponent implements OnInit {

  @Input() menuList: any[] | MenuItem[] = [];
  @Input() logged: boolean = false;
  @Input() picture: string = ''
  @Input() username: string = ''

  minimenu: any | MenuItem[] = [];

  constructor(
    private router: Router,
    private authService: AuthService,
    private temaService: TemaService,
    private utilsService: UtilsService,
    private translateService: TranslateService,
    private duckLayoutComponent: DuckLayoutComponent,
  ) {
  }

  ngOnInit() {
    this.minimenu = [
      {
        duck_label: 'system.profile',
        title: 'system.profile',
        icon: 'fas fa-user',
        command: () => {
          this.router.navigate(['users', 'edit', this.authService.obterUsuario()?.id])
        }
      },
      {
        duck_label: 'system.toggleLanguage',
        icon: 'fas fa-language',
        command: () => this.toggleLanguage()
      },
      {
        duck_label: 'system.toggleTheme',
        icon: 'fas fa-moon',
        command: () => this.toggleTheme()
      },
      {
        duck_label: 'system.leave',
        icon: 'fas fa-door-open',
        command: () => this.signOut()
      }
    ];

    this.translateService.onDefaultLangChange.subscribe(value => {
      this.updateTranslate()
    })
  }

  private updateTranslate() {
    this.minimenu.forEach(async (item: any) => {
      item.label = await this.utilsService.traduzir(item.duck_label);
    });
  }

  private toggleLanguage(): void {
    this.utilsService.toogleLanguage();
  }

  private toggleTheme(): void {
    this.temaService.toggleTheme();
  }

  private signOut(): void {
    this.authService.efetuarLogout();
  }

  colapsarMenu() {
    this.duckLayoutComponent.colapsarMenu = !this.duckLayoutComponent.colapsarMenu
  }
}
