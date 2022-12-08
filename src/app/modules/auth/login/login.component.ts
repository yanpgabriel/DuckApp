import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';
import { ToastService } from '../../../shared/services/toast.service';

@Component({
  selector: 'duck-login',
  template: `

    <div class="d-flex flex-column align-items-center h-full duck-container">
      <div class="formgrid grid">
        <div class="field col">
          <span class="p-float-label">
              <input id="float-input" type="text" pInputText [(ngModel)]="email">
              <label for="float-input">E-mail</label>
          </span>
        </div>
        <div class="field col">
          <span class="p-float-label">
              <p-password id="float-input" styleClass="w-full" [(ngModel)]="password" [toggleMask]="true"></p-password>
              <label for="float-input">Senha</label>
          </span>
        </div>
        <div class="field col">
            <button type="button" pButton class="p-button-outlined" (click)="login()">Enviar</button>
        </div>
      </div>
    </div>

  `,
  styles: ['']
})
export class LoginComponent implements OnInit {

  email = 'tester@mail.com';
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
    const loged = await this.authService.login({ email: this.email, password: this.password });
    if (loged) {
      this.toastService.showSuccess('avisos.LOGIN');
      await this.router.navigate(['/']);
    } else {
      this.toastService.showDanger('avisos.LOGIN_ERROR');
    }
  }



}
