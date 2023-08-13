import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { AuthService } from "../../../shared/services/auth.service";
import { Router } from "@angular/router";
import UserDTO from "../../../shared/models/UserDTO";
import { ToastService } from "../../../shared/services/toast.service";
import { ConfirmationService } from "primeng/api";

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
    public confirmationService: ConfirmationService
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
    const obterProfile = this.authService.obterUsuario();
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
    this.confirmationService.confirm({
      header: 'Confirmação',
      message: 'Deseja confirmar a exclusão desse registro?',
      acceptLabel: 'Confirmar',
      rejectLabel: 'Cancelar',
      accept: () => {
        this.userService.delete(idUsuario).subscribe(res => {
          this.toastService.showMultipleSuccess(res.extras);
        }, () => {}, () => {
          this.atualizarLista();
        })
      },
      reject: () => {
        this.toastService.showInfo("Operação cancelada")
      }
    });
  }

  usuarioPodeCriarNovo(): boolean {
    return this.authService.usuarioPossuiPermissoes('DUCK_ADM');
  }

  criarNovoUsuario() {
    this.router.navigate(['users', "create"])
  }
}
