import { Injectable } from '@angular/core';
import { UtilsService } from './utils.service';
import { HttpClient } from '@angular/common/http';
import UserDTO from '../models/UserDTO';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { TokenService } from "./token.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginEvents = new BehaviorSubject(false);

  constructor(
    public http: HttpClient,
    public router: Router,
    private tokenService: TokenService,
    public utilsService: UtilsService,
  ) {
    this.tokenService.tokenEvents.subscribe(res => this.loginEvents.next(res));
  }

  makeLogin(body) {
    return this.tokenService.accessToken(body);
  }

  usuarioEstaLogado(): boolean {
    // if (this.utilsService.ignoreLogin) {
    //   return false;
    // }
    return this.tokenService.getDecodedToken() != null;
  }

  obterProfile(): UserDTO | null {
    // if (this.utilsService.ignoreLogin) {
    //   return new UserDTO(0, 'yanpgabriel@gmail.com', 'Yan');
    // } else
    const decodedToken = this.tokenService.getDecodedToken();
    if (decodedToken != null) {
      return decodedToken.user;
    }
    console.error('Não foi encontrado nenhum dado do usuario logado!');
    return null;
  }

  efetuarLogout() {
    // if (this.utilsService.ignoreLogin) {
    //   return;
    // }
    this.tokenService.cleanTokens();
    this.router.navigate(['/auth']);
  }

  listenLoginEvents() {
    return this.loginEvents;
  }
}
