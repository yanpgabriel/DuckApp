import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LoadingService} from '../../shared/services/loading.service';
import {KeycloakService} from 'keycloak-angular';

@Component({
  selector: 'duck-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(
    private router: Router,
    private _loading: LoadingService,
    public keycloakService: KeycloakService,
  ) {
  }

  async ngOnInit(): Promise<void> {
    if (await this.keycloakService.isLoggedIn()) {
      console.log("Usuario Logado!");
      await this.router.navigate(['/']);
      return;
    }
  }

  async signInWithKeycloack(): Promise<void> {
    await this.keycloakService.login();
  }

}
