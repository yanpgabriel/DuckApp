import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { AuthService } from "../../../shared/services/auth.service";
import { Router } from "@angular/router";
import UserDTO from "../../../shared/models/UserDTO";
import { ToastService } from "../../../shared/services/toast.service";

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
    public toastService: ToastService,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.cols = [
      { field: 'check', header: '' },
      { field: 'id', header: 'ID' },
      { field: 'email', header: 'E-mail' },
      { field: 'fullname', header: 'Nome Completo' },
      { field: 'dtcreation', header: 'Data Criação', pipe: 'data' },
      { field: 'profile', header: 'Perfil', pipe: 'object' },
      { field: 'actions', header: 'Ações' },
    ];
    this.atualizarLista();
    const obterProfile = this.authService.obterProfile();
    if (obterProfile != null && obterProfile.id != undefined) {
      this.idUsuarioLogado = obterProfile.id;
    }
  }

  atualizarLista() {
    this.userService.list().subscribe(res => {
      this.users = res.entity;
    });
  }

  editUser(usuario: UserDTO) {
    this.router.navigate(['users', 'edit', usuario.id]);
  }

  deleteUser(idUsuario: number) {
    this.userService.delete(idUsuario).subscribe(res => {
      this.toastService.showMultipleSuccess(res.extras);
    }, () => {}, () => {
      this.atualizarLista();
    })
  }
}
