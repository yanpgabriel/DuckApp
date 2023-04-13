import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MenuItem } from 'primeng/api/menuitem';
import { NetworkService } from './shared/services/network.service';
import { AuthService } from './shared/services/auth.service';
import { filter } from "rxjs";
import { UtilsService } from "./shared/services/utils.service";
import { Menu } from "primeng/menu";
import { isNullOrUndefined } from "./shared/util";

@Component({
  selector: 'duck-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  private afterView = false;
  @ViewChild('mnmenu') minimenuComponent: Menu | any = null;

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
    this.listenNetworkConection();
    // this.authService.listenKeycloakEvents();
    this.listenLogin();

    // Trata idiomas
    if (isNullOrUndefined(this.utilsService.getLang())) {
      this.utilsService.reloadLang(this.utilsService.getBrowserLang());
    }

    // Trata breadcrumb
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(async () => {
        this.breadcrumb = await this.utilsService.createBreadcrumbs(this.activatedRoute.root);
        console.log(this.breadcrumb);
      });

    this.createMenu();
    this.updateTranslate();
  }

  signOut(): void {
    this.authService.efetuarLogout();
  }

  createMenu(): void {
    this.menu = [
      {
        label: 'system.menu.dashboard',
        routerLink: '/dashboard',
        icon: 'fas fa-dragon'
      }, {
        label: 'system.menu.users',
        routerLink: '/users',
        icon: 'fas fa-users',
        roles: ['DUCK_ADM', 'USER_LIST']
      }, {
        label: 'system.menu.finances',
        routerLink: '/financas',
        icon: 'fas fa-money-check-alt'
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
        label: 'system.menu.kanban',
        routerLink: '/kanban',
        icon: 'fas fa-columns'
      }, {
        label: 'system.menu.minecraft',
        routerLink: '/minecraft',
        icon: 'fas fa-square-full'
      }, {
        label: 'system.menu.teste',
        routerLink: '/teste',
        icon: 'fas fa-user'
      }
    ];
  }

  toggleLanguage(): void {
    this.utilsService.toogleLanguage();
    this.updateTranslate();
  }

  updateTranslate() {
    this.minimenu = [
      {
        label: 'system.profile',
        icon: 'fas fa-user',
        command: () => {
          this.router.navigate(['users', 'edit', this.authService.obterProfile()?.id])
        }
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
      item.label = await this.utilsService.traduzir(item.label);
    });
  }

  getName() {
    return this.profile?.fullname || 'Usuário não Identificado';
  }

  getPicture() {
    return this.picture || './assets/img/duck.png';
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

  private listenLogin() {
    this.actionsLogin();
    this.authService.listenLoginEvents().subscribe(() => {
      this.actionsLogin();
    });
  }

  private actionsLogin() {
    this._isLoggedIn = this.authService.usuarioEstaLogado();
    if (this.isLoggedIn) {
      this.profile = this.authService.obterProfile();
    }
  }
}
