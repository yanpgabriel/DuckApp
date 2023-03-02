import { Injectable, Injector } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api/menuitem';
import { isNullOrUndefined } from '../util';
import { TranslateService } from "@ngx-translate/core";
import { firstValueFrom } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  private translateService: TranslateService | undefined;
  private langKey = 'lang';

  _ignoreLogin = false;
  get ignoreLogin(): boolean {
    return this._ignoreLogin;
  }

  constructor(
    private readonly injector: Injector
  ) {
  }

  getTranslateService(): TranslateService {
    if (this.translateService != null) {
      console.debug('Aproveitando o "TranslateService" já instanciado!');
      return this.translateService;
    }
    try {
      console.debug('Instanciado um novo "TranslateService"!');
      this.translateService = this.injector.get(TranslateService);
      this.setLang(this.getLocalLang()||this.getBrowserLang())
    } catch (e) {
      console.error('Não foi possivel injetar o "TranslateService".');
    }
    return <TranslateService>this.translateService;
  }

  toogleLanguage() {
    if (this.getTranslateService().getDefaultLang() !== 'pt') {
      this.setLang('pt');
    } else {
      this.setLang('en');
    }
  }

  getLocalLang(): string | null {
    return localStorage.getItem(this.langKey);
  }

  getLang(): string {
    return this.getTranslateService().defaultLang;
  }

  setLang(str: string) {
    console.debug('Setando idioma para "'+str+'"');
    this.getTranslateService().setDefaultLang(str);
    localStorage.setItem(this.langKey, str);
  }

  getBrowserLang(): string {
    return <string>this.getTranslateService().getBrowserLang();
  }

  reloadLang(str) {
    this.getTranslateService().reloadLang(str);
  }

  async traduzir(str: string): Promise<string> {
    console.debug('Buscando tradução para ' + str);
    const result = firstValueFrom(this.getTranslateService().get(str));
    console.debug('Tradução encontrada: ' + result);
    return await result;
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
  async createBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: MenuItem[] = []): Promise<MenuItem[]> {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      console.log(breadcrumbs);
      return breadcrumbs;
    }

    for (const child of children) {
      if (child.component != undefined) {
        const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
        if (routeURL !== '') {
          url += `/${routeURL}`;
        }

        let label = child.snapshot.data['breadcrumb'];
        console.log(label, child);
        if (!isNullOrUndefined(label)) {
          label = await this.traduzir(label);
          breadcrumbs.push({label, url});
        }
      }
      return this.createBreadcrumbs(child, url, breadcrumbs);
    }
  }

}
