import {Injectable} from '@angular/core';
import {KeycloakService} from 'keycloak-angular';
import {ActivatedRoute} from '@angular/router';
import {MenuItem} from 'primeng/api/menuitem';
import {isNullOrUndefined} from '../util';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  _ignoreLogin = false;
  get ignoreLogin(): boolean {
    return this._ignoreLogin;
  }
  _ignoreKeycloak = false;
  get ignoreKeycloak(): boolean {
    return this._ignoreKeycloak;
  }

  constructor(
    public kc: KeycloakService,
  ) { }

  hasRoles(roles: any[]): boolean {
    if (this.ignoreLogin || this.ignoreKeycloak) {
      return true;
    }
    let ok = false;
    let userRoles = this.kc.getUserRoles();
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

  disableKeycloak(): void {
    this._ignoreKeycloak = true;
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
        // label = this.translateService.instant(label);
        breadcrumbs.push({label, url});
      }

      return this.createBreadcrumbs(child, url, breadcrumbs);
    }
  }

}
