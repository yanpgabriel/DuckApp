import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'duck-ponto',
  templateUrl: './ponto.component.html',
  styleUrls: ['./ponto.component.css']
})
export class PontoComponent implements OnInit {

  options: any;
  header: any;

  hora: any;
  eventos: any[] = [];
  registrar = false;

  constructor() { }

  ngOnInit(): void {
    // this.eventos = [
    //   { status: 'Entrada', date: '08:30', icon: 'fas fa-business-time', color: '#05b705' },
    //   { status: 'Almoço', date: '12:30', icon: 'fas fa-utensils', color: '#bd0505' },
    //   { status: 'Retorno', date: '13:30', icon: 'fas fa-utensils', color: '#05b705' },
    //   { status: 'Saida', date: '17:30', icon: 'fas fa-business-time', color: '#bd0505' }
    // ];

    this.options = {
      initialDate : new Date().toISOString().split('T')[0],
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      locale: 'pt-Br',
      editable: true,
      selectable:true,
      selectMirror: true,
      dayMaxEvents: true
    };


    this.updateHora();
  }

  change(evt) {
    if (!evt.checked) {
      this.updateHora();
    }
  }

  salvar() {
    this.registrar = true;
    let hora = !(this.hora instanceof Date) ? this.hora : this.hora.getHours() + ':' + this.hora.getMinutes();
    this.eventos = [
      ...this.eventos,
      { status: 'Entrada', date: hora, icon: 'fas fa-business-time', color: '#05b705' }
    ];
    this.registrar = false;
    this.updateHora();
  }

  updateHora() {
    if (this.registrar) {
      return;
    }
    const data = new Date();
    this.hora = data.getHours() + ':' + data.getMinutes() + ':' + data.getSeconds();
    setTimeout(() => {
      this.updateHora();
    }, 1000);
  }

}
