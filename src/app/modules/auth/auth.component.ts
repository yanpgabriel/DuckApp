import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingService } from '../../shared/services/loading.service';
import { AuthService } from "../../shared/services/auth.service";

@Component({
  selector: 'duck-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(
    private router: Router,
    private _loading: LoadingService,
    private authService: AuthService
  ) {
  }

  async ngOnInit(): Promise<void> {
    if (await this.authService.usuarioEstaLogado()) {
      console.log("Usuario Logado!");
      await this.router.navigate(['/']);
      return;
    }
  }

}
