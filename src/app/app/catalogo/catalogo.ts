import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProdutoService } from '../../services/produto';
import { ServicoService, Servico } from '../../services/servico';
import { CategoriaService, Categoria } from '../../services/categoria';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css'
})
export class CatalogoComponent implements OnInit {
  todosProdutos: any[] = [];
  todosServicos: any[] = [];

  produtosExibidos: any[] = [];
  servicosExibidos: any[] = [];

  // Array que vai guardar TODAS + as categorias do banco
  categorias: string[] = ['TODAS'];
  categoriaSelecionada: string = 'TODAS';
  termoBusca: string = '';

  constructor(
    private produtoService: ProdutoService,
    private servicoService: ServicoService,
    private categoriaService: CategoriaService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.carregarCategorias();
    this.carregarCatalogo();
  }

  // Busca as 5 categorias direto da API /api/Categorium
  carregarCategorias(): void {
    this.categoriaService.getCategorias().subscribe({
      next: (dados: Categoria[]) => {
        const nomesCategorias = dados.map(c => c.categoria);
        this.categorias = ['TODAS', ...nomesCategorias];
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Erro ao carregar categorias:', err)
    });
  }

  carregarCatalogo(): void {
    // 1. Carrega Produtos
    this.produtoService.getProdutos().subscribe({
      next: (dados: any[]) => {
        this.todosProdutos = dados;
        this.aplicarFiltros();
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err)
    });

    // 2. Carrega Serviços
    this.servicoService.getServicos().subscribe({
      next: (dadosServicos: Servico[]) => {
        this.todosServicos = dadosServicos;
        this.aplicarFiltros();
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err)
    });
  }

  filtrarPorCategoria(categoria: string): void {
    this.categoriaSelecionada = categoria;
    this.aplicarFiltros();
  }

  aplicarFiltros(): void {
    // Filtro de Produtos
    this.produtosExibidos = this.todosProdutos.filter(p => {
      const nome = (p.iditemNavigation?.item1 || p.item1 || '').toLowerCase();
      const cat = p.iditemNavigation?.nomeCategoria || p.nomeCategoria || 'Geral';
      
      const bateNome = nome.includes(this.termoBusca.toLowerCase());
      const bateCat = this.categoriaSelecionada === 'TODAS' || cat.toUpperCase() === this.categoriaSelecionada.toUpperCase();

      return bateNome && bateCat;
    });

    // Filtro de Serviços
    this.servicosExibidos = this.todosServicos.filter(s => {
      const nome = (s.nome || '').toLowerCase();
      return nome.includes(this.termoBusca.toLowerCase());
    });
  }

  adicionarAoCarrinho(item: any): void {
    console.log('Adicionado ao carrinho:', item);
  }

  agendarServico(servico: any): void {
    console.log('Agendado:', servico);
  }
}