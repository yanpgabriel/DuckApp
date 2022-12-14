import { Component, OnInit } from '@angular/core';
import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { DemandaService } from '../../shared/services/demanda.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EstadoDemanda } from '../../shared/models/EstadoDemanda';
import { UserService } from '../user/user.service';
import { Demanda } from '../../shared/models/Demanda';
import { Router } from '@angular/router';

@Component({
  selector: 'duck-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.css']
})
export class KanbanComponent implements OnInit {

  estados: EstadoDemanda[] = [];

  demandas: {} = {};

  afazer: string[] = [];

  fazendo: string[] = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  pronto: string[] = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  modal_add = false;
  idEstado: number | null = null;
  estimativas = [
    // { label: '0', value: 0 },
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '5', value: 5 },
    { label: '8', value: 8 },
    { label: '13', value: 13 },
    { label: '21', value: 21 },
    { label: '34', value: 34 }
  ];
  membros: any[] = [];
  todosMembros: any[] = [];

  demandaForm = new FormGroup({
    id: new FormControl(''),
    titulo: new FormControl('', [
      Validators.required,
    ]),
    estimativa: new FormControl('', [
      Validators.required,
    ]),
    descricao: new FormControl('', [
      Validators.required,
    ]),
    membro: new FormControl('', [
      Validators.required,
    ]),
  });

  constructor(
    private userService: UserService,
    private demandaService: DemandaService,
    private router: Router
  ) { }

  async ngOnInit(): Promise<void> {
    try {
      const res = await this.userService.list().toPromise();
      this.todosMembros = res.entity.map(r => {
        return {
          value: r.id,
          label: r.fullname
        }
      });
      this.membros.push(...this.todosMembros);
      const promise = await this.demandaService.listEstados().toPromise();
      this.estados = promise.entity;
      this.listarDemandas();
    } catch (e) {
      console.error('ERRO: Falha ao carregar dados da tela')
      await this.router.navigate(['/000']);
    }
  }

  limparListaDemandasPorEstado() {
    this.estados.forEach(e => {
      this.demandas[e.id] = [];
    })
  }

  listarDemandas() {
    this.limparListaDemandasPorEstado();
    this.demandaService.list().subscribe(res => {
      res.entity.forEach(d => {
        this.demandas[d.idEstado].push(d);
      })
    });
  }

  drop(event: any) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    const demanda = event.container.data[event.currentIndex];
    demanda.idEstado = +event.container.id;
    this.demandaService.atualizar(demanda).subscribe(d => {
      console.log(d);
    });
  }

  close() {
    this.demandaForm.reset();
    this.idEstado = null;
    this.modal_add = false;
  }

  open() {
    this.modal_add = true;
  }

  add(idEstado) {
    this.idEstado = idEstado;
    this.open();
  }

  addEstado() {

  }

  salvar(form: any) {
    const valor: Demanda = {
      id: form.value.id,
      idUser: form.value.membro.value,
      // @ts-ignore
      idEstado: this.idEstado,
      titulo: form.value.titulo,
      desc: form.value.descricao,
      estimativa: form.value.estimativa.value,
    }

    const req = valor.id != null ? this.demandaService.atualizar(valor) : this.demandaService.salvar(valor);
    req.subscribe(res => {
      this.listarDemandas();
      this.close();
    });
  }

  completeMethod(event: any) {
    this.membros = this.todosMembros.filter(m => m.label.toLowerCase().includes(event.query.toLowerCase()));
  }

  check() {
    console.log(this.demandaForm);
  }

  async editarDemanda(id) {
    const { entity } = await this.demandaService.get(id).toPromise();
    this.idEstado = entity.idEstado;
    this.demandaForm.get('id')?.setValue(entity.id);
    this.demandaForm.get('titulo')?.setValue(entity.titulo);
    this.demandaForm.get('membro')?.setValue(this.membros.find(m => m.value == entity.idUser));
    this.demandaForm.get('descricao')?.setValue(entity.desc);
    this.demandaForm.get('estimativa')?.setValue(this.estimativas.find(e => e.value == entity.estimativa));
    this.open();
  }

  async deletarDemanda(id) {
    await this.demandaService.deletar(id).toPromise();
    this.listarDemandas();
  }
}
