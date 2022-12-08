import { Injectable, Injector } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api/menuitem';
import { isNullOrUndefined } from '../util';
import { TranslateService } from "@ngx-translate/core";

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  private translateService;

  _ignoreLogin = false;
  get ignoreLogin(): boolean {
    return this._ignoreLogin;
  }

  constructor(
    private readonly injector: Injector
  ) {
  }

  getTranslateService() {
    if (this.translateService != null) {
      console.debug('Aproveitando o "TranslateService" já instanciado!');
      return this.translateService;
    }
    try {
      console.debug('Instanciado um novo "TranslateService"!');
      this.translateService = this.injector.get(TranslateService);
    } catch (e) {
      console.error('Não foi possivel injetar o "TranslateService".');
    }
    return this.translateService;
  }

  getLang(): string {
    return this.getTranslateService().currentLang;
  }

  getDefaultLang(): string {
    return this.getTranslateService().defaultLang;
  }

  setDefaultLang(str: string) {
    this.getTranslateService().setDefaultLang(str);
  }

  reloadLang(str) {
    this.getTranslateService().reloadLang(str);
  }

  traduzir(str: string) {
    console.debug('Buscando tradução para ' + str);
    return this.getTranslateService().instant(str);
  }

  hasRoles(roles: any[]): boolean {
    if (this.ignoreLogin) {
      return true;
    }
    let ok = false;
    let userRoles = ['DUCK_ADM'];// this.kc.getUserRoles();
    if (roles && roles.length > 0) {
      for (const role of roles) {
        if (userRoles.find(r => r === role)) {
          ok = true;
          break;
        }
      }
      return ok;
    }
    return true;
  }

  // @ts-ignore
  createBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: MenuItem[] = []): MenuItem[]  {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }

      let label = child.snapshot.data['breadcrumb'];
      if (!isNullOrUndefined(label)) {
        label = this.traduzir(label);
        breadcrumbs.push({label, url});
      }

      return this.createBreadcrumbs(child, url, breadcrumbs);
    }
  }

}
