import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'duck-ponto',
  templateUrl: './ponto.component.html',
  styleUrls: ['./ponto.component.css']
})
export class PontoComponent implements OnInit {

  options: any;
  header: any;
  constructor() { }

  ngOnInit(): void {
    this.options = {
      initialDate : '2019-01-01',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      editable: true,
      selectable:true,
      selectMirror: true,
      dayMaxEvents: true
    };
  }

}
