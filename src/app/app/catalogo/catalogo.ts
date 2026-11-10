import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdutoService } from '../../services/produto';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css'
})
export class CatalogoComponent implements OnInit {
  produtos: any[] = [];
  servicos: any[] = [];

  constructor(private produtoService: ProdutoService) {}

  ngOnInit(): void {
    this.carregarCatalogo();
  }

 // catalogo.ts
carregarCatalogo(): void {
  this.produtoService.getProdutos().subscribe({
    next: (dados) => {
      console.log('--- DADOS BRUTOS RECEBIDOS DA API ---', dados);
      
      this.produtos = dados.filter(x => x.iditemNavigation?.tipoItem === 'P');
      this.servicos = dados.filter(x => x.iditemNavigation?.tipoItem === 'S');

      console.log('Produtos filtrados (P):', this.produtos);
      console.log('Serviços filtrados (S):', this.servicos);
    },
    error: (err) => console.error('Erro ao carregar catálogo:', err)
  });
}

  adicionarAoCarrinho(produto: any): void {
    console.log('Produto adicionado:', produto);
  }

  agendarServico(servico: any): void {
    console.log('Serviço agendado:', servico);

  }

}