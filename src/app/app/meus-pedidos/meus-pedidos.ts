import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-meus-pedidos',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './meus-pedidos.html',
  styleUrl: './meus-pedidos.css'
})
export class MeusPedidosComponent implements OnInit {
  pedidos: any[] = [];
  pedidoSelecionado: any = null;
  clienteIdentificado: any = null;

  identificadorBusca: string = '';
  mensagemErro: string = '';
  carregando: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const clienteSalvo = localStorage.getItem('cliente_logado');
    if (clienteSalvo) {
      this.clienteIdentificado = JSON.parse(clienteSalvo);
      this.carregarPedidos();
    }
  }

  identificarCliente(): void {
    this.mensagemErro = '';
    const termo = this.identificadorBusca.trim();

    if (!termo) {
      this.mensagemErro = 'Informe seu CPF ou e-mail cadastrado.';
      return;
    }

    this.carregando = true;
    const cpfNumerico = termo.replace(/\D/g, '');

    this.http.get<any[]>('https://localhost:7077/api/PessoaEndereco').subscribe({
      next: (clientes) => {
        const encontrado = clientes.find(c =>
          c.email?.toLowerCase() === termo.toLowerCase() ||
          (cpfNumerico.length >= 11 && String(c.cpf) === cpfNumerico)
        );

        if (!encontrado) {
          this.mensagemErro = 'Cliente não encontrado. Verifique os dados ou realize seu cadastro.';
          this.carregando = false;
          this.cdr.detectChanges();
          return;
        }

        this.clienteIdentificado = encontrado;
        localStorage.setItem('cliente_logado', JSON.stringify(encontrado));
        this.carregarPedidos();
      },
      error: () => {
        this.mensagemErro = 'Erro ao validar cliente no servidor.';
        this.carregando = false;
        this.cdr.detectChanges();
      }
    });
  }

  carregarPedidos(): void {
    const idCliente = this.clienteIdentificado?.idPessoa || this.clienteIdentificado?.idpessoa;
    if (!idCliente) {
      this.pedidos = [];
      return;
    }

    this.carregando = true;
    this.pedidoSelecionado = null;

    this.http.get<any[]>(`https://localhost:7077/api/Atendimento/cliente/${idCliente}`).subscribe({
      next: (dados) => {
        this.pedidos = dados;
        this.carregando = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Erro ao carregar pedidos:', err);
        this.mensagemErro = 'Erro ao carregar seus pedidos.';
        this.carregando = false;
        this.cdr.detectChanges();
      }
    });
  }

  selecionarPedido(pedido: any): void {
    if (this.pedidoSelecionado?.idAtendimento === pedido.idAtendimento) {
      this.pedidoSelecionado = null;
    } else {
      this.pedidoSelecionado = pedido;
    }
  }

  calcularTotal(itens: any[]): number {
    if (!itens || itens.length === 0) return 0;
    return itens.reduce((soma, i) => soma + (i.quantidade * i.valorUnitario), 0);
  }

  trocarCliente(): void {
    localStorage.removeItem('cliente_logado');
    this.clienteIdentificado = null;
    this.pedidos = [];
    this.pedidoSelecionado = null;
    this.identificadorBusca = '';
    this.mensagemErro = '';
  }

  voltarCatalogo(): void {
    this.router.navigate(['/catalogo']);
  }
}