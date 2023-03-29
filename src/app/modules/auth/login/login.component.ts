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
                  <span id="email" class="p-float-label">
                      <input id="float-input" type="email" pInputText [(ngModel)]="email">
                      <label for="float-input">E-mail</label>
                  </span>
                </div>
                <div class="field col">
                  <span id="senha" class="p-float-label">
                      <p-password id="float-input" styleClass="w-full" [(ngModel)]="password" [toggleMask]="true"></p-password>
                      <label for="float-input">Senha</label>
                  </span>
                </div>
                <div class="field col">
                    <button pButton type="button" id="enviar" class="p-button-outlined" (click)="login()">Enviar</button>
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

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastService: ToastService,
  ) {
  }

  ngOnInit(): void {
  }

  async login(): Promise<void> {
    const logged = await this.authService.makeLogin({ email: this.email, password: this.password });
    if (logged) {
      this.toastService.showSuccess('avisos.LOGIN');
      await this.router.navigate(['/']);
    } else {
      this.toastService.showDanger('avisos.LOGIN_ERROR');
    }
  }



}
