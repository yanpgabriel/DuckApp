import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {UtilsService} from '../services/utils.service';
import {KeycloakAuthGuard, KeycloakService} from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthKeycloakGuard extends KeycloakAuthGuard {

  constructor(
    protected override readonly router: Router,
    protected readonly keycloak: KeycloakService,
    protected readonly utilsService: UtilsService,
  ) {
    super(router, keycloak);
    console.log('passou 1');
  }

  public async isAccessAllowed(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {

    console.log('passou 2');
    if (this.utilsService.ignoreKeycloak) {
      console.log('foi?')
      return true;
    }

    // Força o usuário a efetuar login se não estiver autenticado no momento.
    if (!this.authenticated) {
      await this.router.navigate(['/auth']);
      return false;
      // await this.keycloak.login({
      //   redirectUri: window.location.origin + state.url,
      // });
    }

    // Obtenha as funções necessárias da rota.
    const requiredRoles = route.data['roles'];

    // Permita que o usuário continue se nenhuma função adicional for necessária para acessar a rota.
    if (!(requiredRoles instanceof Array) || requiredRoles.length === 0) {
      return true;
    }

    // Permita que o usuário continue se todas as funções necessárias estiverem presentes.
    return this.roles.some((role) => requiredRoles.includes(role));
  }
}
