import { Component, OnInit } from '@angular/core';
import { FinancasService } from "../financas.service";

@Component({
  selector: 'duck-financas-contas',
  templateUrl: './financas-contas.component.html',
  styleUrls: ['./financas-contas.component.css']
})
export class FinancasContasComponent implements OnInit {

  contas: any = [];

  constructor(
    private contasService: FinancasService
  ) { }

  ngOnInit(): void {
    // this.mockContas();
    this.listarContasComSaldos();
  }

  listarContasComSaldos() {
    this.contasService.listarContasComSaldos().subscribe(res => this.contas = res.entity)
  }

  addConta() {
    alert('não implementado');
  }

  mockContas() {
    this.contas = [
      {
        nome: 'Itaú',
        descricao: '',
        instituicao: 'itau',
        saldoInicial: 0.01,
        cor: '#00cc00',
        somarNaTelaInicial: true,
        dtCriacao: '2023-02-06 00:00:00',
        dtArquivacao: null,
      },
      {
        nome: 'Iti',
        descricao: '',
        instituicao: 'iti-1',
        saldoInicial: 0.01,
        cor: '#00cc00',
        somarNaTelaInicial: true,
        dtCriacao: '2023-02-06 00:00:00',
        dtArquivacao: null,
      },
      {
        nome: 'Nubank',
        descricao: '',
        instituicao: 'nubank',
        saldoInicial: 0.01,
        cor: '#00cc00',
        somarNaTelaInicial: true,
        dtCriacao: '2023-02-06 00:00:00',
        dtArquivacao: null,
      },
      {
        nome: 'C6',
        descricao: '',
        instituicao: 'c6bank-2',
        saldoInicial: 0.01,
        cor: '#00cc00',
        somarNaTelaInicial: true,
        dtCriacao: '2023-02-06 00:00:00',
        dtArquivacao: null,
      },
      {
        nome: 'Inter',
        descricao: '',
        instituicao: 'intermedium',
        saldoInicial: 0.01,
        cor: '#00cc00',
        somarNaTelaInicial: true,
        dtCriacao: '2023-02-06 00:00:00',
        dtArquivacao: null,
      },
      {
        nome: 'Caixa',
        descricao: '',
        instituicao: 'caixa',
        saldoInicial: 0.01,
        cor: '#00cc00',
        somarNaTelaInicial: true,
        dtCriacao: '2023-02-06 00:00:00',
        dtArquivacao: null,
      },
      {
        nome: 'Picpay',
        descricao: '',
        instituicao: 'picpay-1',
        saldoInicial: 0.01,
        cor: '#00cc00',
        somarNaTelaInicial: true,
        dtCriacao: '2023-02-06 00:00:00',
        dtArquivacao: null,
      }
    ];
  }

}
