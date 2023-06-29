import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UtilsService } from '../services/utils.service';
import { AuthService } from '../services/auth.service';
import { isNullOrUndefined } from "../util";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{

  constructor(
    protected readonly router: Router,
    protected readonly authService: AuthService,
    protected readonly utilsService: UtilsService,
) { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    if (this.utilsService.ignoreLogin) {
      return true;
    }
    if (!this.authService.usuarioEstaLogado()) {
      await this.router.navigate(['/auth']);
      console.debug('[Guard] Acesso negado por não estar logado.')
      return false;
    }
    // return true;
    // Obtenha as funções necessárias da rota.
    const requiredRoles = route.data['roles'];

    // Permita que o usuário continue se nenhuma função adicional for necessária para acessar a rota.
    if (!(requiredRoles instanceof Array) || requiredRoles.length === 0) {
      return true;
    }

    // Se precisar de permissão mas não encontrar o usuario bloqueia o acesso
    const profile = this.authService.obterUsuario()?.profile;
    if (isNullOrUndefined(profile)) {
      console.debug('[Guard] Acesso negado por não possuir permissão alguma.')
      return false;
    }

    // Permita que o usuário continue se todas as funções necessárias estiverem presentes.
    // @ts-ignore
    const possuiPermissoes = profile.roles.map(roleDTO => roleDTO.name).some((role) => requiredRoles.includes(role));
    if (!possuiPermissoes) {
      console.debug('[Guard] Acesso negado por não possuir as permissões necessarias.')
    }
    return possuiPermissoes;
  }


}
