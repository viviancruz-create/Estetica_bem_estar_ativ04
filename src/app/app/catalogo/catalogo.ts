import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdutoService } from '../../services/produto';
import { ServicoService} from '../../services/servico'; 

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

  constructor(
    private produtoService: ProdutoService,
    private servicoService: ServicoService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.carregarCatalogo();
  }

  carregarCatalogo(): void {
    // 1. Carrega os Produtos
    this.produtoService.getProdutos().subscribe({
      next: (dados: any[]) => {
        console.log('Produtos recebidos:', dados);
        this.produtos = dados;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Erro ao carregar produtos:', err)
    });

    // 2. Carrega os Serviços da API /api/Servico
    this.servicoService.getServicos().subscribe({
      next: (dadosServicos: any[]) => {
        console.log('Serviços recebidos:', dadosServicos);
        this.servicos = dadosServicos;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Erro ao carregar serviços:', err)
    });
  }

  adicionarAoCarrinho(produto: any): void {
    console.log('Adicionado:', produto);
  }

  agendarServico(servico: any): void {
    console.log('Agendado:', servico);
  }
}