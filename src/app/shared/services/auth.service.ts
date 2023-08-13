import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { TokenService } from "./token.service";
import UserDTO from '../models/UserDTO';
import { isNullOrUndefined } from "../util";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginEvents = new BehaviorSubject(false);

  constructor(
    public router: Router,
    private tokenService: TokenService,
  ) {
    this.tokenService.tokenEvents.subscribe(res => this.loginEvents.next(res));
  }

  makeLogin(body) {
    return this.tokenService.accessToken(body);
  }

  usuarioEstaLogado(): boolean {
    return this.obterUsuario() != null;
  }

  obterUsuario(): UserDTO | null {
    const decodedToken = this.tokenService.getDecodedToken();
    if (decodedToken != null) {
      return decodedToken.user;
    }
    console.error('Não foi encontrado nenhum dado do usuario logado!');
    return null;
  }

  efetuarLogout() {
    this.tokenService.cleanTokens();
    this.router.navigate(['/auth']);
  }

  listenLoginEvents() {
    return this.loginEvents;
  }

  usuarioPossuiPermissoes(requiredRoles): boolean {
    // Caso não passe nenhuma permissão ignora
    if (!(requiredRoles instanceof Array) || requiredRoles.length === 0) {
      return true;
    }

    // Se não encontrar o usuario ou o perfil ignora
    const usuario = this.obterUsuario();

    if (isNullOrUndefined(usuario) || isNullOrUndefined(usuario.profile)) {
      return false;
    }
    const perfil = usuario.profile;

    // Caso tenha permissões necessarias e tenha perfil, verifica se o usuario possui alguma
    return perfil.roles.map(roleDTO => roleDTO.name).some((role) => requiredRoles.includes(role));
  }
}
