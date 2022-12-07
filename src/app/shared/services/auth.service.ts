import {Injectable} from '@angular/core';
import {KeycloakEventType, KeycloakService} from 'keycloak-angular';
import {UtilsService} from './utils.service';
import * as Keycloak_ from 'keycloak-js';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {LoginResponse} from '../models/LoginResponse';
import {TokenInfo} from '../models/TokenInfo';
import UserDTO from '../models/UserDTO';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private taskIdRefreshToken;
  private tokenInfo: TokenInfo | null = null;
  private loginEvents = new Subject();

  constructor(
    public kc: KeycloakService,
    public http: HttpClient,
    public router: Router,
    public utilsService: UtilsService,
  ) {
    const token = this.getToken();
    if (token) {
      this.tokenInfo = this.decodeToken();
      this.agendarProximoToken();
    }
  }

  login(body) {
    return new Promise((resolve, reject) => {
      this.http.post<LoginResponse>(`${environment.api_host}/auth/login`, body)
        .subscribe(res => this.sucesso(res, resolve), error => this.erro(error, reject));
    });
  }

  retoken() {
    const refreshToken = this.getRefreshToken();
    return new Promise((resolve, reject) => {
    this.http.get<LoginResponse>(`${environment.api_host}/auth/retoken/${refreshToken}`)
      .subscribe(res => this.sucesso(res, resolve), error => this.erro(error, reject));
    });
  }

  getToken() {
    return localStorage.getItem('accessToken');
  }

  getRefreshToken() {
    return localStorage.getItem('refreshToken');
  }

  updateTokens(res: LoginResponse) {
    Object.keys(res).forEach(key => {
      localStorage.setItem(key, res[key]);
    })
  }

  cleanTokens() {
    this.tokenInfo = null;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  decodeToken(): TokenInfo {
    const token = this.getToken() || '';
    const split = token.split('.');
    return JSON.parse(atob(split[1]));
  }

  agendarProximoToken() {
    if (this.tokenInfo == null) {
      return;
    }
    const exp = new Date(this.tokenInfo.exp * 1000).getTime();
    const now = new Date().getTime();
    const timeToNextToken = (exp - now) - 10000;
    if (this.taskIdRefreshToken != null) {
      clearTimeout(this.taskIdRefreshToken);
    }
    this.taskIdRefreshToken = setTimeout(async () => {
      await this.retoken();
    }, timeToNextToken);
  }

  async usuarioEstaLogado(): Promise<boolean> {
    if (!this.utilsService.ignoreLogin) {
      return this.tokenInfo != null;
    } else if (this.utilsService.ignoreKeycloak || await this.kc.isLoggedIn()) {
      return true;
    }
    return false;
  }

  async obterProfile(): Promise<Keycloak_.KeycloakProfile | UserDTO> {
    if (!this.utilsService.ignoreLogin && this.tokenInfo != null) {
      return this.tokenInfo.user;
    } else if (this.utilsService.ignoreKeycloak) {
      return {
        id: '0',
        email: 'yanpgabriel@gmail.com',
        firstName: 'Yan',
      }
    }
    return await this.kc.loadUserProfile();
  }

  efetuarLogout() {
    const redirectUri = window.location.origin;
    if (!this.utilsService.ignoreLogin) {
      this.cleanTokens();
      this.loginEvents.next(false);
      this.router.navigate(['/auth']);
    } else if (!this.utilsService.ignoreKeycloak) {
      this.kc.logout(redirectUri);
    }
  }

  listenLoginEvents() {
    return this.loginEvents;
  }

  listenKeycloakEvents() {
    this.kc.keycloakEvents$.subscribe(keycloakEvent => {
      if (keycloakEvent.type == KeycloakEventType.OnAuthLogout) {
        // Deslogou
      }
    });
  }

  private sucesso(res, resolve) {
    this.updateTokens(res.entity);
    this.tokenInfo = this.decodeToken();
    this.agendarProximoToken();
    this.loginEvents.next(true);
    resolve(true);
  }

  private erro(error, reject) {
    clearTimeout(this.taskIdRefreshToken);
    this.loginEvents.next(false);
    reject(error);
  }
}
