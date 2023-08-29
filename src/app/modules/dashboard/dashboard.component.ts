import { Component, HostListener, OnInit } from '@angular/core';
import { DashboardService } from "./dashboard.service";

@Component({
  selector: 'duck-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  altura = 0;
  largura = 0;
  host_url = window.location.origin;

  sistemas: {
    name: string,
    icon: string,
    link: string
  }[] = [];

  constructor(
    public appService: DashboardService,
  ) { }

  ngOnInit(): void {
    this.updateDimensoes(window.innerWidth, window.innerHeight);
    this.listarSistemas();
  }

  listarSistemas() {
    this.appService.list().subscribe(res => {
      this.sistemas = res.entity;
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.updateDimensoes(event.target.innerWidth, event.target.innerHeight)
  }

  updateDimensoes(width, height) {
    this.largura = width;
    this.altura = height;
  }

}
