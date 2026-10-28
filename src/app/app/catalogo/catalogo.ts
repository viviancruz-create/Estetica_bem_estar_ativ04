import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdutoService, Produto } from '../../services/produto';
import { ServicoService, Servico } from '../../services/servico';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css'
})
export class CatalogoComponent implements OnInit {
  produtos: Produto[] = [];
  servicos: Servico[] = [];

  constructor(
    private produtoService: ProdutoService,
    private servicoService: ServicoService
  ) {}

  ngOnInit(): void {
    this.produtos = this.produtoService.getProdutos();
    this.servicos = this.servicoService.getServicos();
  }
}
