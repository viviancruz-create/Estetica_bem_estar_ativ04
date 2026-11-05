import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PedidoService, Pedido } from '../../services/pedido';

@Component({
  selector: 'app-pedidos-abertos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pedidos-aberto.html',
  styleUrls: ['./pedidos-aberto.css']
})
export class PedidosAbertosComponent implements OnInit {
  pedidos: Pedido[] = [];
  pedidoSelecionado: Pedido | null = null;
  carregando: boolean = false;

  constructor(private pedidoService: PedidoService) {}

  ngOnInit(): void {
    this.carregarPedidosAbertos();
  }

  carregarPedidosAbertos(): void {
    this.carregando = true;
    this.pedidoService.getPedidosAbertos().subscribe({
      next: (dados: Pedido[]) => {
        this.pedidos = dados;
        this.carregando = false;
      },
      error: (err: any) => {
        console.error('Erro ao buscar pedidos em aberto:', err);
        this.carregando = false;
      }
    });
  }

  verDetalhes(pedido: Pedido): void {
    this.pedidoSelecionado = pedido;
  }

  fecharModal(): void {
    this.pedidoSelecionado = null;
  }

  alterarStatus(idpedido: number, novoStatus: string): void {
    if (confirm(`Deseja alterar o estado do pedido #${idpedido} para "${novoStatus}"?`)) {
      this.pedidoService.atualizarStatus(idpedido, novoStatus).subscribe({
        next: () => {
          alert(`Pedido #${idpedido} atualizado com sucesso!`);
          this.fecharModal();
          this.carregarPedidosAbertos();
        },
        error: (err: any) => {
          alert('Erro ao atualizar estado do pedido: ' + (err.error?.mensagem || err.message));
        }
      });
    }
  }
}