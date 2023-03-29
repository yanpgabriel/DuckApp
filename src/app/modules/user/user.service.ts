import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import UserDTO from "../../shared/models/UserDTO";
import { BaseResponse } from "../../shared/models/BaseResponse";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpClient: HttpClient
  ) { }

  list(): Observable<any> {
    return this.httpClient.get<any>(`${environment.api_host}/user`);
  }

  verifyGroup(): Observable<any> {
    return this.httpClient.get<any>(`${environment.api_host}/user/is-admin`);
  }

  obterPorId(idUser: number): Observable<BaseResponse> {
    return this.httpClient.get<BaseResponse>(`${environment.api_host}/user/${idUser}`);
  }

  salvar(user: UserDTO): Observable<BaseResponse> {
    return this.httpClient.post<BaseResponse>(`${environment.api_host}/user`, user);
  }

  atualizar(user: UserDTO): Observable<BaseResponse> {
    return this.httpClient.put<BaseResponse>(`${environment.api_host}/user`, user);
  }

  delete(idUser: number): Observable<BaseResponse> {
    return this.httpClient.delete<BaseResponse>(`${environment.api_host}/user/${idUser}`);
  }
}
