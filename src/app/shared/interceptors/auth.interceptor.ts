import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {LoadingService} from '../services/loading.service';
import {KeycloakBearerInterceptor, KeycloakService} from 'keycloak-angular';
import {environment} from '../../../environments/environment';
import {catchError, finalize} from 'rxjs/operators';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Injectable()
export class AuthInterceptor extends KeycloakBearerInterceptor {

  constructor(
    public _loading: LoadingService,
    public router: Router,
    public authService: AuthService,
    public keycloakService: KeycloakService
  ) {
    super(keycloakService);
  }

  override intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      let requisicao;
      this._loading.setLoading(true, req.url);
      if (!req.url.includes(environment.api_host)) { //  && this.keycloakService.hasToken()
        const cloned = req.clone({
          headers: req.headers.delete('Authorization')
        });
        requisicao = next.handle(cloned);
      } else {
        requisicao = next.handle(req);
      }
    return requisicao
        .pipe(
          // @ts-ignore
          catchError(async (her) => {
            await this.tratarErro(her);
            return throwError(her.error);
          }),
          finalize(() => {
            this._loading.setLoading(false, req.url);
          })
        );
  }

  private async tratarErro(her: { status: any; error: { extras: any[]; }; }): Promise<void> {
    switch (her.status) {
      case 401:
        // this.toastService.showInfo('NOT_AUTHORIZED');
        console.log('ERRO! NOT_AUTHORIZED');
        // this.keycloakService.logout(environment.base_uri).then(() => {
        //   this.toastService.showSuccess('LOGOUT');
        // }).catch((err) => {
        //   this.toastService.showDanger(`Erro: ${err}`);
        // });
        break;
      case 403:
        // this.toastService.showDanger('FORBIDDEN');
        break;
    }
    if (await this.authService.usuarioEstaLogado()) {
      her.error?.extras?.forEach(extra => {
        // this.toastService.showDanger(extra);
      });
    }
  }
}
