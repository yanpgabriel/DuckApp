import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../user.service';
import {LoadingService} from '../../../shared/services/loading.service';

@Component({
  selector: 'duck-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  cols: { field: string, header: string, pipe?: string }[] = [];
  users: {
    id: string,
    fullname: string,
    email: string
  }[] | undefined | any;
  action: string | undefined;

  constructor(
    public userService: UserService,
    public activatedRoute: ActivatedRoute,
    public loadingService: LoadingService
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
    // @ts-ignore
    this.action = this.activatedRoute.snapshot.routeConfig.path || 'list';
    this.userService.list().subscribe(res => {
      this.users = res.entity;
    });
  }

  // dtcreation: "2021-05-08 00:00:01"
  // email: "tester@mail.com"
  // fullname: "Tester"
  // id: 0
  // keycloackId: "00000000-0000-0000-0000-000000000000"
  editUser(usuario: any) {

  }

  deleteUser(usuario: any) {

  }

  toggleLoading() {
    this.loadingService.toggleLoading();
    // setTimeout(() => {
    //   this.loadingService.toggleLoading();
    // }, 10000)
  }
}
