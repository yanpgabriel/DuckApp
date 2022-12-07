import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BotDiscordService {

  servers: any = [];
  selectedServer: any;

  constructor(
    private httpClient: HttpClient
  ) {
  }

  listServers(): Observable<any> {
    return this.httpClient.get<any>(`${environment.api_host}/bot/servers`);
  }

  queueFromServer(idServer: string): Observable<any> {
    return this.httpClient.get<any>(`${environment.api_host}/bot/queue/${idServer}`);
  }

  initBot() {
    return this.httpClient.get<any>(`${environment.api_host}/bot/start`);
  }

  stopBot() {
    return this.httpClient.get<any>(`${environment.api_host}/bot/stop`);
  }

  async checkBot() {
    return await this.httpClient.get<any>(`${environment.api_host}/bot/check`).toPromise();
  }
}
