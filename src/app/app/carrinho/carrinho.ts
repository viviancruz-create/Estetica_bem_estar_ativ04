import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CarrinhoService, ItemCarrinho } from '../../services/carrinho';

@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrinho.html',
  styleUrl: './carrinho.css'
})
export class CarrinhoComponent implements OnInit {
  itens: ItemCarrinho[] = [];

  constructor(
    private carrinhoService: CarrinhoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.itens = this.carrinhoService.getItens();
  }

  remover(id: number, tipo: 'produto' | 'servico'): void {
    this.carrinhoService.removerItem(id, tipo);
    this.itens = this.carrinhoService.getItens();
  }

  getTotal(): number {
    return this.carrinhoService.getTotal();
  }

  finalizarPedido(): void {
    if (this.itens.length === 0) {
      alert('Seu carrinho está vazio!');
      return;
    }
    alert('Pedido efetuado com sucesso!');
    this.carrinhoService.limparCarrinho();
    this.router.navigate(['/meus-pedidos']);
  }
}