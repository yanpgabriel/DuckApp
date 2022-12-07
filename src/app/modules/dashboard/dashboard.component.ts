import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../shared/services/auth.service';
import {UserService} from '../user/user.service';

@Component({
  selector: 'duck-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  sistemas: {
    nome: string,
    icone: string,
    link: string
  }[] = [];

  constructor(
    public authService: AuthService,
    public userService: UserService,
  ) { }

  ngOnInit(): void {
    this.listarSistemas();
  }

  listarSistemas() {
    this.sistemas = [
      {
        nome: 'CasaOS',
        icone: 'http://local.yanpgabriel.com/img/casa-white.2579f069.svg',
        link: 'http://local.yanpgabriel.com/#/'
      },
      {
        nome: 'Portainer',
        icone: 'https://icon.casaos.io/main/all/portainer-ce.png',
        link: 'https://local.yanpgabriel.com:9443/'
      },
      {
        nome: 'Jellyfin',
        icone: 'https://cdn.jsdelivr.net/gh/IceWhaleTech/CasaOS-AppStore@main/Apps/Jellyfin/icon.png',
        link: 'http://local.yanpgabriel.com:8096/'
      },
      {
        nome: 'Home Assistant',
        icone: 'https://brands.home-assistant.io/homeassistant/icon.png',
        link: 'http://local.yanpgabriel.com:8123/'
      },
      {
        nome: 'Jenkins',
        icone: 'http://local.yanpgabriel.com:8008/static/6f86b4e0/images/svgs/logo.svg',
        link: 'http://local.yanpgabriel.com:8008/'
      },
      {
        nome: 'Discord Bot',
        icone: '',
        link: 'http://local.yanpgabriel.com:8069/'
      },
    ];
  }

}
