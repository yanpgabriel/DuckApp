import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';
import { ToastService } from '../../../shared/services/toast.service';

@Component({
  selector: 'duck-login',
  template: `
    <div class="d-flex flex-column align-items-center h-full duck-container">
        <div class="formgrid grid">
            <div class="col-12 md:col-12 lg:col-6 xl:col-4 caixa lg:col-offset-3 xl:col-offset-4">
                <div class="text-center align-self-center w-full duck">
                  <img alt="DuckApp" src="/assets/img/duck.png"/>
                </div>
                <div class="field col pb-4">
                  <duck-input-text id="email"
                                   label="E-mail:"
                                   [(ngModel)]="email"
                  ></duck-input-text>
                </div>
                <div class="field col">
                  <duck-input-text-pass id="senha"
                                        label="Senha:"
                                        [toggleMask]="true"
                                        [(ngModel)]="password"
                  ></duck-input-text-pass>
                </div>
                <div class="field col">
                    <button pButton type="button" id="enviar" class="p-button-outlined" [disabled]="!btnAtivo" (click)="login()">Enviar</button>
                </div>
            </div>
        </div>
    </div>
  `,
  styles: ['']
})
export class LoginComponent implements OnInit {

  email = 'testeradmin@mail.com';
  password = 'teste';
  btnAtivo = true;

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastService: ToastService
  ) {
  }

  ngOnInit(): void {
    document.addEventListener('keypress',  (event) => {
      if (event.key == "Enter") {
        this.btnAtivo = false;
        this.login();
      }
    })
  }

  async login(): Promise<void> {
    const logged = await this.authService.makeLogin({ email: this.email, password: this.password });
    if (logged) {
      this.toastService.showSuccess('avisos.LOGIN');
      await this.router.navigate(['/']);
    } else {
      this.btnAtivo = true;
      this.toastService.showDanger('avisos.LOGIN_ERROR');
    }
  }

}
