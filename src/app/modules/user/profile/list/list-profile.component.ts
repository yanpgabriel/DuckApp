import { Component, OnInit } from '@angular/core';
import { ProfileService } from "../profile.service";

@Component({
  selector: 'duck-list-profile',
  templateUrl: './list-profile.component.html',
  styleUrls: ['./list-profile.component.css']
})
export class ListProfileComponent implements OnInit {

  cols: { field: string, header: string, pipe?: string }[] = [];
  profiles: any;

  constructor(
    public profileService: ProfileService
  ) { }

  ngOnInit(): void {
    this.cols = [
      { field: 'check', header: '' },
      { field: 'id', header: 'ID' },
      { field: 'name', header: 'Perfil' },
      { field: 'dtcreation', header: 'Data Criação', pipe: 'data' },
      { field: 'actions', header: 'Ações' },
    ];
    this.atualizarLista();
  }

  atualizarLista() {
    this.profileService.list().subscribe(res => {
      this.profiles = res.entity;
    });
  }

}
