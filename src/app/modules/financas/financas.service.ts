import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { BaseResponse } from "../../shared/models/BaseResponse";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FinancasService {

  private BASE_URL = environment.api_host + '/financas';

  constructor(
    private http: HttpClient
  ) { }

  listarContasComSaldos(): Observable<BaseResponse> {
    return this.http.get<BaseResponse>(`${this.BASE_URL}/conta/saldos`);
  }

  obterSaldoTotal(): Observable<BaseResponse> {
    return this.http.get<BaseResponse>(`${this.BASE_URL}/conta/saldo-total`);
  }
}
