import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";
import { UserService } from "../user.service";
import UserDTO from "../../../shared/models/UserDTO";
import { ActivatedRoute, Router } from "@angular/router";
import { firstValueFrom } from "rxjs";
import { ToastService } from "../../../shared/services/toast.service";
import { isStringVaziaNullOrUndefined } from "../../../shared/util";
import { ProfileService } from "../profile/profile.service";

@Component({
  selector: 'duck-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  formGroup: UntypedFormGroup | any;
  user: UserDTO | undefined;
  profiles : { label: string, value: any }[] = [];

  constructor(
    private fb: UntypedFormBuilder,
    private userService: UserService,
    private profileService: ProfileService,
    private toastService: ToastService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  async ngOnInit(): Promise<void> {
    this.criarFormulario();
    await this.atualizarListaDePermissoes();
    const params = this.activatedRoute.snapshot.params;
    const idUser = params['idUser'];
    if (idUser) {
      const response = await firstValueFrom(this.userService.obterPorId(idUser));
      this.user = response.entity;
      const {id, email, fullname, password, profile} = this.user != undefined ? this.user : new UserDTO();
      this.formGroup.setValue({id, email, fullname, password, profile});
    }
  }

  criarFormulario() {
    this.formGroup = this.fb.group({
      'id': this.fb.control('', null),
      'email': this.fb.control('', null),
      'fullname': this.fb.control('', null),
      'password': this.fb.control(null, null),
      'profile': this.fb.control(null, null),
    });
  }

  async atualizarListaDePermissoes() {
    const response = await firstValueFrom(this.profileService.list());
    this.profiles = response.entity.map(p => ({ label: p.name, value: p }))
  }

  cancelar() {
    this.router.navigate(['/users/list']);
  }

  salvar() {
    const { id, email, fullname, password, profile } = this.formGroup.value;
    const user = new UserDTO(email, fullname);
    user.id = id;
    user.password = password;
    user.profile = profile;

    const request = isStringVaziaNullOrUndefined(id) ? this.userService.salvar(user) : this.userService.atualizar(user);

    request.subscribe(res => {
      this.toastService.showMultipleSuccess(res.extras);
      this.cancelar();
    });
  }

}
