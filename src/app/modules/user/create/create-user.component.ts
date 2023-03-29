import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { UserService } from "../user.service";
import UserDTO from "../../../shared/models/UserDTO";
import { ActivatedRoute, Router } from "@angular/router";
import { firstValueFrom } from "rxjs";
import { ToastService } from "../../../shared/services/toast.service";
import { isStringVaziaNullOrUndefined } from "../../../shared/util";

@Component({
  selector: 'duck-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  formGroup: FormGroup | any;
  user: UserDTO | undefined;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private toastService: ToastService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    const idUser = params['idUser'];
    if (idUser) {
      firstValueFrom(this.userService.obterPorId(idUser))
        .then(res => {
          this.user = res.entity;
          const {id, email, fullname, password} = this.user != undefined ? this.user : new UserDTO();
          this.formGroup.setValue({id, email, fullname, password});
        });
    }

    this.formGroup = this.fb.group({
      'id': this.fb.control('', null),
      'email': this.fb.control('', null),
      'fullname': this.fb.control('', null),
      'password': this.fb.control(null, null),
    });
  }

  cancelar() {
    this.router.navigate(['/users/list']);
  }

  salvar() {
    const { id, email, fullname, password } = this.formGroup.value;
    const user = new UserDTO(email, fullname);
    user.id = id;
    user.password = password;

    console.log('aqui id', id)
    const request = isStringVaziaNullOrUndefined(id) ? this.userService.salvar(user) : this.userService.atualizar(user);

    request.subscribe(res => {
      this.toastService.showMultipleSuccess(res.extras);
      this.cancelar();
    });
  }

}
