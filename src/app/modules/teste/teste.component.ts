import { Component, OnInit } from '@angular/core';
import { LoadingService } from "../../shared/services/loading.service";

@Component({
  selector: 'duck-teste',
  templateUrl: './teste.component.html',
  styleUrls: ['./teste.component.css']
})
export class TesteComponent implements OnInit {

  constructor(
    private loadingService: LoadingService
  ) { }

  ngOnInit(): void {
  }

  printTamanho() {
    alert(`Largura: ${window.innerWidth} Altura: ${window.innerHeight}`)
  }

  loading() {
    this.loadingService.setLoading(true);
    setTimeout(() => this.loadingService.setLoading(false), 5000);
  }

}
