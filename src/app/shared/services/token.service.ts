import { Injectable } from '@angular/core';
import { LoginResponse } from "../models/LoginResponse";
import { environment } from "../../../environments/environment";
import { accessTokenKey, refreshTokenKey } from "../util";
import { TokenInfo } from "../models/TokenInfo";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private taskIdRefreshToken;
  private decodedToken: TokenInfo | null = null;
  public tokenEvents = new BehaviorSubject(false);

  constructor(
    private http: HttpClient
  ) {
    const token = this.getAccessTokenRaw();
    if (token) {
      this.decodedToken = this.decodeToken();
      this.agendarProximoToken();
    }
  }

  accessToken(body) {
    return new Promise((resolve, reject) => {
      this.http.post<LoginResponse>(`${environment.api_host}/auth/login`, body)
        .subscribe(res => this.successCallback(res, resolve), error => this.errorCallback(error, reject));
    });
  }

  refreshToken() {
    const refreshToken = this.getRefreshTokenRaw();
    return new Promise((resolve, reject) => {
      this.http.get<LoginResponse>(`${environment.api_host}/auth/retoken/${refreshToken}`)
        .subscribe(res => this.successCallback(res, resolve), error => this.errorCallback(error, reject));
    });
  }

  getAccessTokenRaw(): string | null {
    return localStorage.getItem(accessTokenKey);
  }

  getRefreshTokenRaw(): string | null {
    return localStorage.getItem(refreshTokenKey);
  }

  getDecodedToken(): TokenInfo | null {
    return this.decodedToken;
  }

  updateTokens(res: LoginResponse) {
    Object.keys(res).forEach(key => {
      localStorage.setItem(key, res[key]);
    })
  }

  cleanTokens() {
    this.decodedToken = null;
    localStorage.removeItem(accessTokenKey);
    localStorage.removeItem(refreshTokenKey);
    this.tokenEvents.next(false);
  }

  decodeToken(): TokenInfo {
    const token = this.getAccessTokenRaw() || '';
    const split = token.split('.');
    return JSON.parse(atob(split[1]));
  }

  agendarProximoToken() {
    if (this.decodedToken == null) {
      return;
    }
    const exp = new Date(this.decodedToken.exp * 1000).getTime();
    const now = new Date().getTime();
    const timeToNextToken = (exp - now) - 30000;
    if (this.taskIdRefreshToken != null) {
      clearTimeout(this.taskIdRefreshToken);
    }
    this.taskIdRefreshToken = setTimeout(async () => {
      await this.refreshToken();
    }, timeToNextToken);
    console.debug('Proximo agendamento do refresh token marcado para: ' + timeToNextToken + 's');
  }

  private successCallback(res, resolve) {
    this.updateTokens(res.entity);
    this.decodedToken = this.decodeToken();
    console.debug(this.decodedToken);
    this.agendarProximoToken();
    this.tokenEvents.next(true);
    resolve(true);
  }

  private errorCallback(error, reject) {
    clearTimeout(this.taskIdRefreshToken);
    this.tokenEvents.next(false);
    reject(error);
  }

}
