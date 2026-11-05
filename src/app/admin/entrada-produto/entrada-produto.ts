import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProdutoService, Produto } from '../../services/produto';
import { EstoqueService, EntradaProdutoDTO, HistoricoEntrada } from '../../services/estoque';

@Component({
  selector: 'app-entrada-produtos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './entrada-produto.html',
  styleUrls: ['./entrada-produto.css']
})
export class EntradaProdutosComponent implements OnInit {
  produtos: Produto[] = [];
  historico: HistoricoEntrada[] = [];

  form: EntradaProdutoDTO = this.obterFormVazio();

  constructor(
    private produtoService: ProdutoService,
    private estoqueService: EstoqueService
  ) {}

  ngOnInit(): void {
    this.carregarProdutos();
    this.carregarHistorico();
  }

  obterFormVazio(): EntradaProdutoDTO {
    return {
      iditem: 0,
      quantidade: 1,
      precoCusto: 0,
      observacao: ''
    };
  }

  carregarProdutos(): void {
    this.produtoService.getProdutos().subscribe({
      next: (dados) => (this.produtos = dados),
      error: (err) => console.error('Erro ao carregar lista de produtos:', err)
    });
  }

  carregarHistorico(): void {
    this.estoqueService.getHistoricoEntradas().subscribe({
      next: (dados) => (this.historico = dados),
      error: (err) => console.error('Erro ao carregar histórico de entradas:', err)
    });
  }

  aoSelecionarProduto(): void {
    const produtoSel = this.produtos.find(p => p.iditem === Number(this.form.iditem));
    if (produtoSel && produtoSel.iditemNavigation) {
      this.form.precoCusto = produtoSel.iditemNavigation.preco || 0;
    }
  }

  salvarEntrada(): void {
    if (!this.form.iditem || this.form.iditem === 0) {
      alert('Por favor, selecione um produto.');
      return;
    }

    if (this.form.quantidade <= 0) {
      alert('A quantidade deve ser maior que zero.');
      return;
    }

    this.estoqueService.registrarEntrada(this.form).subscribe({
      next: () => {
        alert('Entrada de produto registrada com sucesso no estoque!');
        this.form = this.obterFormVazio();
        this.carregarHistorico();
      },
      error: (err) => alert('Erro ao registrar entrada: ' + (err.error?.mensagem || err.message))
    });
  }
}