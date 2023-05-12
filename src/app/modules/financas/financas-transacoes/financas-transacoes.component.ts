import { Component, OnInit } from '@angular/core';
import { FinancasService } from "../financas.service";

@Component({
  selector: 'duck-financas-transacoes',
  templateUrl: './financas-transacoes.component.html',
  styleUrls: ['./financas-transacoes.component.css']
})
export class FinancasTransacoesComponent implements OnInit {

  cols: { field: string, header: string, value?: (obj) => {}, pipe?: string }[] = [];
  categorias: any = [];
  transacoes: any = [];

  constructor(
    private financasService: FinancasService
  ) { }

  ngOnInit(): void {
    this.configurarColunas()
    this.listarCategoriaTransacao();
    this.listarTransacoes();
  }

  private configurarColunas() {
    this.cols = [
      { field: 'id', header: 'ID' },
      { field: 'descricao', header: 'Descrição' },
      { field: 'valor', header: 'Valor', pipe: 'monetario' },
      { field: 'categoria', header: 'Categoria', pipe: 'chip', value: (obj) => obj.descricao },
      { field: 'conta', header: 'Conta', pipe: 'chip', value: (obj) => obj.nome },
      { field: 'actions', header: 'Ações' },
    ];
  }

  private listarTransacoes() {
    this.financasService.obterTransacoes().subscribe(res => this.transacoes = res.entity)
  }

  private listarCategoriaTransacao() {
    this.financasService.obterCategoriasTransacao().subscribe(res => this.categorias = res.entity)
  }
}
