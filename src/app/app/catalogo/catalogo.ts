import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdutoService, Produto } from '../../services/produto';
import { ServicoService, Servico } from '../../services/servico';
import { CarrinhoService } from '../../services/carrinho';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './catalogo.html',
  styleUrls: ['./catalogo.css']
})
export class CatalogoComponent implements OnInit {
  produtos: Produto[] = [];
  servicos: Servico[] = [];

  constructor(
    private produtoService: ProdutoService,
    private servicoService: ServicoService,
    private carrinhoService: CarrinhoService
  ) {}

  ngOnInit(): void {
    this.produtos = this.produtoService.getProdutos();
    this.servicos = this.servicoService.getServicos();
  }

  adicionarProduto(p: Produto): void {
    this.carrinhoService.adicionarItem({
      id: p.id,
      nome: p.nome,
      preco: p.preco,
      quantidade: 1,
      tipo: 'produto'
    });
    alert(`${p.nome} adicionado ao carrinho!`);
  }

  adicionarServico(s: Servico): void {
    this.carrinhoService.adicionarItem({
      id: s.id,
      nome: s.nome,
      preco: s.preco,
      quantidade: 1,
      tipo: 'servico'
    });
    alert(`${s.nome} adicionado ao carrinho!`);
  }
}