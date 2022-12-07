import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from './modules/user/user.service';
import {KeycloakProfile} from 'keycloak-js';
import {MenuItem} from 'primeng/api/menuitem';
import {BreadcrumbService} from './shared/services/breadcrumb.service';
import {NetworkService} from './shared/services/network.service';
import {AuthService} from './shared/services/auth.service';
import {isNullOrUndefined} from './shared/util';
import {TranslateService} from '@ngx-translate/core';

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
  profile: KeycloakProfile | any = {};
  private _isLoggedIn = false;
  get isLoggedIn(): boolean {
    return this._isLoggedIn;
  }

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private networkService: NetworkService,
    public userService: UserService,
    public translateService: TranslateService,
    public breadcrumbService: BreadcrumbService,
    public authService: AuthService,
    // public utilsService: UtilsService,
  ) {
  }

  async ngOnInit(): Promise<void> {
    this.authService.listenKeycloakEvents();
    this.listenLogin();

    // Trata idiomas
    if (isNullOrUndefined(this.translateService.currentLang)) {
      this.translateService.reloadLang(this.translateService.getDefaultLang());
    }

    // Trata breadcrumb
    // this.router.events
    //   .pipe(filter(event => event instanceof NavigationEnd))
    //   .subscribe(() => this.breadcrumb = this.utilsService.createBreadcrumbs(this.activatedRoute.root));

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
    if (this.translateService.getDefaultLang() === 'pt') {
      this.translateService.setDefaultLang('en');
    } else {
      this.translateService.setDefaultLang('pt');
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
      // item.label = await firstValueFrom(this.translateService.get(item.label));
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
