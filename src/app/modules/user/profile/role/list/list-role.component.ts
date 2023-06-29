import { Component, OnInit } from '@angular/core';
import { RoleService } from "../role.service";

@Component({
  selector: 'duck-list-role',
  templateUrl: './list-role.component.html',
  styleUrls: ['./list-role.component.css']
})
export class ListRoleComponent implements OnInit {

  cols: { field: string, header: string, pipe?: string }[] = [];
  roles: any;

  constructor(
    public rolesService: RoleService
  ) { }

  ngOnInit(): void {
    this.cols = [
      { field: 'check', header: '' },
      { field: 'id', header: 'ID' },
      { field: 'name', header: 'Perfil' },
      { field: 'actions', header: 'Ações' },
    ];
    this.atualizarLista();
  }

  atualizarLista() {
    this.rolesService.list().subscribe(res => {
      this.roles = res.entity;
    });
  }

}
