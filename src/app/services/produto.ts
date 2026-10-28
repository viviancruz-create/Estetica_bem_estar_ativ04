import { Injectable } from '@angular/core';

export interface Produto {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  imagemUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private produtos: Produto[] = [
    {
      id: 1,
      nome: 'Creme Hidratante Facial',
      descricao: 'Hidratação profunda para todos os tipos de pele.',
      preco: 89.90,
      imagemUrl: 'https://via.placeholder.com/150'
    },
    {
      id: 2,
      nome: 'Sérum Vitamina C',
      descricao: 'Ação antioxidante e iluminadora.',
      preco: 120.00,
      imagemUrl: 'https://via.placeholder.com/150'
    }
  ];

  getProdutos(): Produto[] {
    return this.produtos;
  }
}