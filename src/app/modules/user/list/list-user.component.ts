import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { AuthService } from "../../../shared/services/auth.service";

@Component({
  selector: 'duck-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  idUsuarioLogado = -1;
  cols: { field: string, header: string, pipe?: string }[] = [];
  users: any;

  constructor(
    public userService: UserService,
    public authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.cols = [
      { field: 'check', header: '' },
      { field: 'id', header: 'ID' },
      { field: 'email', header: 'E-mail' },
      { field: 'fullname', header: 'Nome Completo' },
      { field: 'dtcreation', header: 'Data Criação', pipe: 'data' },
      { field: 'keycloackId', header: 'Keycloack ID' },
      { field: 'actions', header: 'Ações' },
    ];
    this.userService.list().subscribe(res => {
      this.users = res.entity;
    });
    const obterProfile = this.authService.obterProfile();
    if (obterProfile != null && obterProfile.id != undefined) {
      this.idUsuarioLogado = obterProfile.id;
    }
  }

  editUser(usuario: any) {

  }

  deleteUser(usuario: any) {

  }
}
