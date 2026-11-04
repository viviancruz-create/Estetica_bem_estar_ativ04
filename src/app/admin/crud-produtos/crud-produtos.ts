import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProdutoService, Produto, ProdutoDTO } from '../../services/produto'; // Aponta para src/app/services/produto

@Component({
  selector: 'app-crud-produtos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crud-produtos.html',
  styleUrls: ['./crud-produtos.css']
})
export class CrudProdutosComponent implements OnInit {
  produtos: Produto[] = [];
  editandoId: number | null = null;

  form: ProdutoDTO = this.obterFormVazio();

  constructor(private produtoService: ProdutoService) {}

  ngOnInit(): void {
    this.carregarProdutos();
  }

  obterFormVazio(): ProdutoDTO {
    return {
      idCategoria: 1,
      item: '',
      descricaoItem: '',
      preco: 0,
      tipoItem: 'P',
      ativoProdutoServico: 'S',
      codigoVenda: '',
      precoVenda: 0,
      unidade: 'UN'
    };
  }

  carregarProdutos(): void {
    this.produtoService.getProdutos().subscribe({
      next: (dados) => (this.produtos = dados),
      error: (err) => console.error('Erro ao carregar produtos do backend:', err)
    });
  }

  salvar(): void {
    if (this.editandoId !== null) {
      this.produtoService.atualizarProduto(this.editandoId, this.form).subscribe({
        next: () => {
          alert('Produto atualizado com sucesso!');
          this.cancelarEdicao();
          this.carregarProdutos();
        },
        error: (err) => alert('Erro ao atualizar produto: ' + (err.error?.mensagem || err.message))
      });
    } else {
      this.produtoService.cadastrarProduto(this.form).subscribe({
        next: () => {
          alert('Produto cadastrado com sucesso!');
          this.cancelarEdicao();
          this.carregarProdutos();
        },
        error: (err) => alert('Erro ao cadastrar produto: ' + (err.error?.mensagem || err.message))
      });
    }
  }

  editar(p: Produto): void {
    this.editandoId = p.iditem;
    this.form = {
      idCategoria: p.iditemNavigation?.idcategoria || 1,
      item: p.iditemNavigation?.item1 || '',
      descricaoItem: p.iditemNavigation?.descricaoItem || '',
      preco: p.iditemNavigation?.preco || 0,
      tipoItem: p.iditemNavigation?.tipoItem || 'P',
      ativoProdutoServico: p.iditemNavigation?.ativoProdutoServico || 'S',
      codigoVenda: p.codigoPreco || '',
      precoVenda: p.precoVenda || 0,
      unidade: p.unidade || 'UN'
    };
  }

  excluir(id: number): void {
    if (confirm(`Deseja realmente excluir o produto #${id}?`)) {
      this.produtoService.excluirProduto(id).subscribe({
        next: () => {
          alert('Produto excluído com sucesso!');
          this.carregarProdutos();
        },
        error: (err) => alert('Erro ao excluir produto: ' + (err.error?.mensagem || err.message))
      });
    }
  }

  cancelarEdicao(): void {
    this.editandoId = null;
    this.form = this.obterFormVazio();
  }
}