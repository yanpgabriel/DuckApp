import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { LoadingService } from '../services/loading.service';

@Injectable({
  providedIn: 'root'
})
export class AuthResolve implements Resolve<any> {

  constructor(
    private service: AuthService,
    private loading: LoadingService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any>|Promise<any>|any {
    return new Promise( (resolve) => {
      this.loading.setLoading(true, `/${route.routeConfig?.path}`);
      setTimeout(() => {
        this.loading.setLoading(false, `/${route.routeConfig?.path}`);
        resolve('token');
        // resolve(this.service.getToken());
      }, 5000);
    } );
  }

}
