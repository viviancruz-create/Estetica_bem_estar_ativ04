import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProdutoService } from '../../services/produto';
import { ServicoService, Servico } from '../../services/servico';
import { CategoriaService, Categoria } from '../../services/categoria';
import { CarrinhoService, ItemCarrinho } from '../../services/carrinho';

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

  categorias: string[] = ['TODAS'];
  categoriaSelecionada: string = 'TODAS';
  termoBusca: string = '';

  constructor(
    private produtoService: ProdutoService,
    private servicoService: ServicoService,
    private categoriaService: CategoriaService,
    private carrinhoService: CarrinhoService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.carregarCategorias();
    this.carregarCatalogo();
  }

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
      error: (err) => console.error('Erro ao carregar produtos:', err)
    });

    // 2. Carrega apenas Serviços ATIVOS
    this.servicoService.getServicos().subscribe({
      next: (dadosServicos: Servico[]) => {
        this.todosServicos = dadosServicos.filter(s => s.ativo !== false);
        this.aplicarFiltros();
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Erro ao carregar serviços:', err)
    });
  }

  filtrarPorCategoria(categoria: string): void {
    this.categoriaSelecionada = categoria;
    this.aplicarFiltros();
  }

  aplicarFiltros(): void {
    const busca = this.termoBusca.toLowerCase();
    const catAlvo = this.categoriaSelecionada.toUpperCase();

    // Filtro de Produtos
    this.produtosExibidos = this.todosProdutos.filter(p => {
      const nome = (p.iditemNavigation?.item1 || p.item1 || '').toLowerCase();
      const cat = (p.iditemNavigation?.nomeCategoria || p.nomeCategoria || 'Geral').toUpperCase();
      
      const bateNome = nome.includes(busca);
      const bateCat = catAlvo === 'TODAS' || cat === catAlvo;

      return bateNome && bateCat;
    });

    // Filtro de Serviços (por nome e categoria)
    this.servicosExibidos = this.todosServicos.filter(s => {
      const nome = (s.nome || '').toLowerCase();
      const catServico = (s.categoria || s.nomeCategoria || 'Facial').toUpperCase();

      const bateNome = nome.includes(busca);
      const bateCat = catAlvo === 'TODAS' || catServico === catAlvo;

      return bateNome && bateCat;
    });
  }

  adicionarAoCarrinho(prod: any): void {
    const novoItem: ItemCarrinho = {
      id: prod.iditem,
      nome: prod.iditemNavigation?.item1 || prod.item1 || 'Produto',
      preco: prod.precoVenda || prod.preco || prod.iditemNavigation?.preco || 0,
      quantidade: 1,
      tipo: 'produto'
    };

    this.carrinhoService.adicionarItem(novoItem);
    alert(`Produto "${novoItem.nome}" adicionado ao carrinho!`);
  }

  agendarServico(serv: any): void {
    const novoItem: ItemCarrinho = {
      id: serv.id,
      nome: serv.nome,
      preco: serv.preco,
      quantidade: 1,
      tipo: 'servico'
    };

    this.carrinhoService.adicionarItem(novoItem);
    alert(`Serviço "${novoItem.nome}" adicionado ao carrinho!`);
  }
}