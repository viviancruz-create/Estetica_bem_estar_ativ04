import { Injectable } from '@angular/core';

export interface ItemCarrinho {
  id: number;
  nome: string;
  preco: number;
  quantidade: number;
  tipo: 'produto' | 'servico';
  estoqueDisponivel?: number;
}

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {
  private itens: ItemCarrinho[] = [];
  private readonly STORAGE_KEY = 'carrinho_maravilhosas';

  constructor() {
    const dadosSalvos = localStorage.getItem(this.STORAGE_KEY);
    if (dadosSalvos) {
      this.itens = JSON.parse(dadosSalvos);
    }
  }

  private salvarStorage(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.itens));
  }

  getItens(): ItemCarrinho[] {
    return this.itens;
  }

  adicionarItem(item: ItemCarrinho): void {
    const itemExistente = this.itens.find(i => i.id === item.id && i.tipo === item.tipo);
    if (itemExistente) {
      if (itemExistente.tipo === 'produto' && itemExistente.estoqueDisponivel !== undefined) {
        if (itemExistente.quantidade + 1 > itemExistente.estoqueDisponivel) {
          alert(`Estoque máximo atingido (${itemExistente.estoqueDisponivel} disponíveis).`);
          return;
        }
      }
      itemExistente.quantidade += 1;
    } else {
      if (item.tipo === 'produto' && item.estoqueDisponivel !== undefined && item.estoqueDisponivel <= 0) {
        alert('Produto sem estoque disponível no momento.');
        return;
      }
      this.itens.push({ ...item, quantidade: 1 });
    }
    this.salvarStorage();
  }

  alterarQuantidade(id: number, tipo: 'produto' | 'servico', novaQuantidade: number): void {
    const item = this.itens.find(i => i.id === id && i.tipo === tipo);
    if (!item) return;

    if (novaQuantidade <= 0) {
      this.removerItem(id, tipo);
      return;
    }

    if (tipo === 'produto' && item.estoqueDisponivel !== undefined && novaQuantidade > item.estoqueDisponivel) {
      alert(`Quantidade indisponível! Estoque máximo: ${item.estoqueDisponivel}.`);
      item.quantidade = item.estoqueDisponivel;
    } else {
      item.quantidade = novaQuantidade;
    }

    this.salvarStorage();
  }

  removerItem(id: number, tipo: 'produto' | 'servico'): void {
    this.itens = this.itens.filter(i => !(i.id === id && i.tipo === tipo));
    this.salvarStorage();
  }

  getTotal(): number {
    return this.itens.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);
  }

  limparCarrinho(): void {
    this.itens = [];
    localStorage.removeItem(this.STORAGE_KEY);
  }
}