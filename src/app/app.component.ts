import { Component } from '@angular/core';
import { SocialAuthService } from 'angularx-social-login';
import { AuthService } from './shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'DuckApp';
  menu = [
    {
      nome: 'Dashboard',
      link: '/dashboard',
      icon: 'fas fa-dragon'
    }
  ];

  constructor(
    public authService: AuthService,
    public socialAuthService: SocialAuthService,
    private router: Router
  ) {
  }

  signOut(): void {
    this.socialAuthService.signOut().finally(() => {
      this.router.navigateByUrl('/auth');
    });
  }

}
