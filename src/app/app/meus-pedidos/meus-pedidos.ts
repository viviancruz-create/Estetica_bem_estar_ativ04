import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Pedido {
  id: number;
  data: string;
  total: number;
  status: string;
}

@Component({
  selector: 'app-meus-pedidos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './meus-pedidos.html',
  styleUrl: './meus-pedidos.css'
})
export class MeusPedidosComponent implements OnInit {
  pedidos: Pedido[] = [
    { id: 1001, data: '28/10/2026', total: 239.90, status: 'Concluído' },
    { id: 1002, data: '25/10/2026', total: 150.00, status: 'Em Processamento' }
  ];

  ngOnInit(): void {}
}