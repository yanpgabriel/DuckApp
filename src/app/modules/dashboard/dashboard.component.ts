import { Component, OnInit } from '@angular/core';
import { DashboardService } from "./dashboard.service";

@Component({
  selector: 'duck-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  sistemas: {
    name: string,
    icon: string,
    link: string
  }[] = [];

  constructor(
    public appService: DashboardService,
  ) { }

  ngOnInit(): void {
    this.listarSistemas();
  }

  listarSistemas() {
    this.appService.list().subscribe(res => {
      this.sistemas = res.entity;
    });
  }

}
