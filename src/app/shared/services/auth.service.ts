import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { TokenService } from "./token.service";
import UserDTO from '../models/UserDTO';

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
}
