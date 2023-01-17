import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Demanda } from '../models/Demanda';

@Injectable({
  providedIn: 'root'
})
export class DemandaService {

  constructor(
    private httpClient: HttpClient
  ) { }

  salvar(demanda: Demanda) {
    return this.httpClient.post<any>(`${environment.api_host}/demanda`, demanda);
  }

  atualizar(demanda: Demanda): Observable<any> {
    return this.httpClient.put<any>(`${environment.api_host}/demanda`, demanda);
  }

  deletar(idDemanda: number): Observable<any> {
    return this.httpClient.delete<any>(`${environment.api_host}/demanda/${idDemanda}`);
  }

  get(idDemanda: number): Observable<any> {
    return this.httpClient.get<any>(`${environment.api_host}/demanda/${idDemanda}`);
  }

  list(): Observable<any> {
    return this.httpClient.get<any>(`${environment.api_host}/demanda`);
  }

  listEstados(): Observable<any> {
    return this.httpClient.get<any>(`${environment.api_host}/estado-demanda`);
  }

  salvarEstado(novoEstado) {
    return this.httpClient.post<any>(`${environment.api_host}/estado-demanda`, novoEstado);
  }
}
