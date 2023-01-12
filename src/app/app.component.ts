import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MenuItem } from 'primeng/api/menuitem';
import { NetworkService } from './shared/services/network.service';
import { AuthService } from './shared/services/auth.service';
import { isNullOrUndefined } from './shared/util';
import { filter } from "rxjs";
import { UtilsService } from "./shared/services/utils.service";

@Component({
  selector: 'duck-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  title = 'DuckApp';
  menu: any | MenuItem[] = [];
  minimenu: any | MenuItem[] = [];
  home = { icon: 'pi pi-home', routerLink: '/' };
  breadcrumb: MenuItem[] = [];
  picture: string = '/assets/img/duck.png';
  profile: any = {};
  private _isLoggedIn = false;
  get isLoggedIn(): boolean {
    return this._isLoggedIn;
  }

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private networkService: NetworkService,
    public authService: AuthService,
    public utilsService: UtilsService,
  ) {
  }

  async ngOnInit(): Promise<void> {
    // this.authService.listenKeycloakEvents();
    this.listenLogin();

    // Trata idiomas
    if (isNullOrUndefined(this.utilsService.getLang())) {
      this.utilsService.reloadLang(this.utilsService.getDefaultLang());
    }

    // Trata breadcrumb
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => this.breadcrumb = this.utilsService.createBreadcrumbs(this.activatedRoute.root));

    this.profile = await this.authService.obterProfile();
    this.picture = this.profile?.attributes?.picture_google;

    this.createMenu();
    this.updateTranslate();
    this.listenNetworkConection();
  }

  createMenu(): void {
    this.menu = [
      {
        label: 'Dashboard',
        routerLink: '/dashboard',
        icon: 'fas fa-dragon'
      }, {
        label: 'system.menu.users',
        routerLink: '/users',
        icon: 'fas fa-users',
        roles: ['DUCK_ADM', 'USER_LIST']
      }, {
        label: 'system.menu.ponto',
        routerLink: '/ponto',
        icon: 'fas fa-business-time',
        roles: ['DUCK_ADM', 'PONTO']
      }, {
        label: 'system.menu.tasks',
        routerLink: '/tasks',
        icon: 'fas fa-list-ul',
        roles: ['DUCK_ADM', 'TASKS']
      }, {
        label: 'system.menu.bot',
        routerLink: '/bot',
        icon: 'fas fa-user',
        roles: ['DUCK_ADM', 'BOT']
      }, {
        label: 'system.menu.teste',
        routerLink: '/teste',
        icon: 'fas fa-user'
      }, {
        label: 'system.menu.kanban',
        routerLink: '/kanban',
        icon: 'fas fa-columns'
      }
    ];
  }

  signOut(): void {
    this.authService.efetuarLogout();
  }

  toggleLanguage(): void {
    if (this.utilsService.getDefaultLang() === 'pt') {
      this.utilsService.setDefaultLang('en');
    } else {
      this.utilsService.setDefaultLang('pt');
    }
    this.updateTranslate();
  }

  updateTranslate() {
    this.minimenu = [
      {
        label: 'system.profile',
        icon: 'fas fa-user'
      },
      {
        label: 'system.toggleLanguage',
        icon: 'fas fa-language',
        command: () => this.toggleLanguage()
      },
      {
        label: 'system.leave',
        icon: 'fas fa-door-open',
        command: () => this.signOut()
      }
    ];
    this.minimenu.forEach(async (item: any) => {
      item.label = this.utilsService.traduzir(item.label);
    });
  }

  private listenNetworkConection() {
    this.networkService.statusConexao.subscribe(online => {
      if (online) {
        console.log('Aplicação online, salvando tudo usando a API.');
      } else {
        console.log('Aplicação offiline, salvando tudo no banco local.');
      }
    })
  }

  private async listenLogin() {
    this._isLoggedIn = await this.authService.usuarioEstaLogado();
    this.authService.listenLoginEvents().subscribe(async () => {
      this._isLoggedIn = await this.authService.usuarioEstaLogado();
    });
  }
}
