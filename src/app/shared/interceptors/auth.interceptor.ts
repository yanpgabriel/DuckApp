import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    public authService: AuthService
  ) {
  }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (req.url.includes(environment.api_host)) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + this.authService.user.idToken)
      });
      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}
