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
    // Busca produtos do backend
    this.produtoService.getProdutos().subscribe({
      next: (dados: Produto[]) => {
        this.produtos = dados;
      },
      error: (erro: any) => {
        console.error('Erro ao carregar produtos:', erro);
      }
    });

    // CORREÇÃO AQUI: Inscreve no Observable do serviço de serviços
    this.servicoService.getServicos().subscribe({
      next: (dados: Servico[]) => {
        this.servicos = dados;
      },
      error: (erro: any) => {
        console.error('Erro ao carregar serviços:', erro);
      }
    });
  }

  adicionarProduto(p: Produto): void {
    const nomeProduto = p.iditemNavigation?.item1 || 'Produto';
    const precoProduto = p.precoVenda || p.iditemNavigation?.preco || 0;

    this.carrinhoService.adicionarItem({
      id: p.iditem,
      nome: nomeProduto,
      preco: precoProduto,
      quantidade: 1,
      tipo: 'produto'
    });
    alert(`${nomeProduto} adicionado ao carrinho!`);
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