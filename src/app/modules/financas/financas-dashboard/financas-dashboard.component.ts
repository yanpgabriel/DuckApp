import { Component, OnInit } from '@angular/core';
import { FinancasService } from "../financas.service";
import { firstValueFrom } from "rxjs";

@Component({
  selector: 'duck-financas-dashboard',
  templateUrl: './financas-dashboard.component.html',
  styleUrls: ['./financas-dashboard.component.css']
})
export class FinancasDashboardComponent implements OnInit {

  saldoTotal = 0;

  constructor(
    private financasService: FinancasService
  ) { }

  async ngOnInit(): Promise<void> {
    const baseResponse = await firstValueFrom(this.financasService.obterSaldoTotal());
    this.saldoTotal = baseResponse.entity;
  }

}
