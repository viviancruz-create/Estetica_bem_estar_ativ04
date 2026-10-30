import { Injectable } from '@angular/core';

export interface ItemCarrinho {
  id: number;
  nome: string;
  preco: number;
  quantidade: number;
  tipo: 'produto' | 'servico';
}

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {
  private itens: ItemCarrinho[] = [];

  getItens(): ItemCarrinho[] {
    return this.itens;
  }

  adicionarItem(item: ItemCarrinho): void {
    const itemExistente = this.itens.find(i => i.id === item.id && i.tipo === item.tipo);
    if (itemExistente) {
      itemExistente.quantidade += 1;
    } else {
      this.itens.push({ ...item, quantidade: 1 });
    }
  }

  removerItem(id: number, tipo: 'produto' | 'servico'): void {
    this.itens = this.itens.filter(i => !(i.id === id && i.tipo === tipo));
  }

  getTotal(): number {
    return this.itens.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);
  }

  limparCarrinho(): void {
    this.itens = [];
  }
}