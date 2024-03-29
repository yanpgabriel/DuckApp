import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';
import { MenuItem } from 'primeng/api/menuitem';
import { NetworkService } from './shared/services/network.service';
import { AuthService } from './shared/services/auth.service';
import { filter } from "rxjs";
import { UtilsService } from "./shared/services/utils.service";
import { Menu } from "primeng/menu";
import { isNullOrUndefined } from "./shared/util";
import { LoadingService } from "./shared/services/loading.service";
import { ToastService } from "./shared/services/toast.service";

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
  home = { icon: 'fas fa-home', routerLink: '/' };
  breadcrumb: MenuItem[] = [];
  picture = '/assets/img/duck.png';
  profile: any = {};
  private _isLoggedIn = false;
  get isLoggedIn(): boolean {
    return this._isLoggedIn;
  }

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private networkService: NetworkService,
    private loadingService: LoadingService,
    private toastService: ToastService,
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

    // Trata LazyLoading
    this.router.events
      .pipe(filter(event => event instanceof RouteConfigLoadStart || event instanceof RouteConfigLoadEnd))
      .subscribe((event) => {
        if (event instanceof RouteConfigLoadStart) {
          this.loadingService.setLoading(true, 'NOVA_ROTA')
        } else if (event instanceof RouteConfigLoadEnd) {
          this.loadingService.setLoading(false, 'NOVA_ROTA')
        }
      });

    // Trata breadcrumb
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe( () => {
        this.updateBreadcrumb()
      });

    this.createMenu();
  }

  private createMenu(): void {
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

  private updateBreadcrumb() {
    this.utilsService.createBreadcrumbs(this.activatedRoute.root).then(res => this.breadcrumb = res);
    console.debug('Novo Breadcrumb', this.breadcrumb);
  }

  private listenNetworkConection() {
    this.networkService.statusConexao.subscribe(online => {
      if (online) {
        console.debug('Aplicação online, salvando tudo usando a API.');
        this.toastService.showInfo('avisos.NETWORK');
      } else {
        console.debug('Aplicação offiline, salvando tudo no banco local.');
        this.toastService.showDanger('avisos.NOT_NETWORK');
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
      this.profile = this.authService.obterUsuario();
    }
  }

  getName() {
    return this.profile?.fullname || 'Usuário não Identificado';
  }

  getPicture() {
    return this.picture || './assets/img/duck.png';
  }

}
