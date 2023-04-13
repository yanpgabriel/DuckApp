import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

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
    return this.httpClient.get<any>(`${environment.discord_bot_host}/bot/music/servers`);
  }

  queueFromServer(idServer: string): Observable<any> {
    return this.httpClient.get<any>(`${environment.discord_bot_host}/bot/music/queue/${idServer}`);
  }

  initBot() {
    return this.httpClient.get<any>(`${environment.discord_bot_host}/bot/music/start`);
  }

  stopBot() {
    return this.httpClient.get<any>(`${environment.discord_bot_host}/bot/music/stop`);
  }

  async checkBot() {
    return await this.httpClient.get<any>(`${environment.discord_bot_host}/bot/music/check`).toPromise();
  }
}
