import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'duck-contas',
  templateUrl: './contas.component.html',
  styleUrls: ['./contas.component.css']
})
export class ContasComponent implements OnInit {

  contas: any = [];

  constructor() { }

  ngOnInit(): void {
    this.listarContas();
  }

  listarContas() {
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
