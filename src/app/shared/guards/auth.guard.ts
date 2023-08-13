import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UtilsService } from '../services/utils.service';
import { AuthService } from '../services/auth.service';

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
    const podeProsseguir = this.authService.usuarioPossuiPermissoes(route.data['roles']);
    if (!podeProsseguir) {
      console.debug('[Guard] Acesso negado por falta de permissões.')
    }
    return podeProsseguir;
  }


}
