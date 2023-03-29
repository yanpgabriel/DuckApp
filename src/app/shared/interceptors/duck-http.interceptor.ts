import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { catchError, finalize } from 'rxjs/operators';
import { NetworkService } from '../services/network.service';
import { ToastService } from '../services/toast.service';
import { LoadingService } from '../services/loading.service';
import { AuthService } from '../services/auth.service';
import { TokenService } from "../services/token.service";

@Injectable()
export class DuckHttpInterceptor implements HttpInterceptor  {

  constructor(
    public authService: AuthService,
    public tokenService: TokenService,
    public toastService: ToastService,
    public networkService: NetworkService,
    public loadingService: LoadingService,
  ) {
  }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let requisicao;
    // this._loading.setLoading(true, req.url);
    if (!req.url.includes(environment.api_host) || req.url.includes('/login')) { //  && this.keycloakService.hasToken()
      const cloned = req.clone({
        headers: req.headers.delete('Authorization')
      });
      requisicao = next.handle(cloned);
    } else {
      const token = 'Bearer ' + this.tokenService.getAccessTokenRaw();
      const cloned = req.clone({
        headers: req.headers.set('Authorization', token||'')
      });
      requisicao = next.handle(cloned);
    }
    this.loadingService.setLoading(true, req.url);
    return requisicao
      .pipe(
        // @ts-ignore
        catchError(async (her) => {
          console.log('Erro: ', her)
          await this.tratarErro(her)
        }),
        finalize(() => {
          this.loadingService.setLoading(false, req.url);
        })
      );
  }

  private async tratarErro(her: { status: any; error: { extras: string[]; }; url: string; }): Promise<void> {
    switch (her.status) {
      case 0:
        if (this.networkService.isOnline) {
          if (her.url.includes(environment.api_host)) {
            this.toastService.showDanger('avisos.NOT_CONNECTION');
            this.authService.efetuarLogout();
            console.log('Aplicação não conseguiu estabelecer conexão com o servidor');
          }
        } else {
          console.log('Aplicação offiline');
        }
        break;
      case 401:
        this.toastService.showInfo('avisos.NOT_AUTHORIZED');
        this.authService.efetuarLogout();
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
      case 300:
        this.toastService.showMultipleInfo(her.error.extras);
        break;
      case 400:
      case 500:
        this.toastService.showMultipleDanger(her.error.extras);
        break;
    }
    // console.log(her.error);
    // if (await this.authService.usuarioEstaLogado()) {
    //   her.error?.extras?.forEach(extra => {
    //     this.toastService.showDanger(extra);
    //   });
    // }
  }

}
