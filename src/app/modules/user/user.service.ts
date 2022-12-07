import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

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
}
