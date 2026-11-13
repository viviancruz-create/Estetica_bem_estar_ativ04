import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-meus-pedidos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './meus-pedidos.html',
  styleUrl: './meus-pedidos.css'
})
export class MeusPedidosComponent implements OnInit {
  pedidos: any[] = [];
  carregando: boolean = true;

  constructor(
    private http: HttpClient,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.carregarPedidos();
  }

  carregarPedidos(): void {
    const clienteSalvo = localStorage.getItem('cliente_logado');
    const cliente = clienteSalvo ? JSON.parse(clienteSalvo) : null;
    const idCliente = cliente ? (cliente.idPessoa || cliente.idpessoa) : null;

    this.http.get<any[]>('https://localhost:7077/api/Atendimento').subscribe({
      next: (dados) => {
        if (idCliente) {
          this.pedidos = dados.filter(p => p.idPessoa === idCliente);
        } else {
          this.pedidos = dados;
        }
        this.carregando = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Erro ao carregar pedidos:', err);
        this.carregando = false;
        this.cdr.detectChanges();
      }
    });
  }

  calcularTotal(itens: any[]): number {
    if (!itens || itens.length === 0) return 0;
    return itens.reduce((soma, i) => soma + (i.quantidade * i.valorUnitario), 0);
  }

  voltarCatalogo(): void {
    this.router.navigate(['/catalogo']);
  }
}