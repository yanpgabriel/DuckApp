import {Injectable} from '@angular/core';
import {Observable, Observer, Subject} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BotDiscordSocketService {

  private subject: Subject<MessageEvent|any> | undefined;

  public connect(url: string): Subject<MessageEvent|any> {
    if (!this.subject) {
      this.subject = this.create(url);
      console.log('Successfully connected: ' + url);
    }
    return this.subject;
  }

  private create(url: string): Subject<MessageEvent|any> {
    const ws = new WebSocket(url.replace('http', 'ws'));

    const observable = new Observable((obs: Observer<MessageEvent|any>) => {
      ws.onmessage = obs.next.bind(obs);
      ws.onerror = obs.error.bind(obs);
      ws.onclose = obs.complete.bind(obs);
      return ws.close.bind(ws);
    });
    const observer = {
      next: (data: any) => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(typeof data != 'string' ? JSON.stringify(data) : data);
        }
      }
    };
    return Subject.create(observer, observable);
  }

  socket(serverId) {
    return this.connect(`${environment.ws_host}/bot/socket/${serverId}`)
  }
}
