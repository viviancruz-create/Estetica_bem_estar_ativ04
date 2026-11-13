import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CarrinhoService, ItemCarrinho } from '../../services/carrinho';

@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrinho.html',
  styleUrls: ['./carrinho.css']
})
export class CarrinhoComponent implements OnInit {
  itens: ItemCarrinho[] = [];
  mensagemErro: string = '';

  constructor(
    private carrinhoService: CarrinhoService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.itens = this.carrinhoService.getItens();
  }

  aumentarQuantidade(item: ItemCarrinho): void {
    this.carrinhoService.alterarQuantidade(item.id, item.tipo, item.quantidade + 1);
    this.itens = this.carrinhoService.getItens();
  }

  diminuirQuantidade(item: ItemCarrinho): void {
    this.carrinhoService.alterarQuantidade(item.id, item.tipo, item.quantidade - 1);
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
    this.mensagemErro = '';

    if (this.itens.length === 0) {
      alert('Seu carrinho está vazio!');
      return;
    }

    // Verifica se o cliente já se cadastrou ou se identificou na sessão
    const clienteSalvo = localStorage.getItem('cliente_logado');
    if (!clienteSalvo) {
      alert('Por favor, realize seu cadastro antes de confirmar o pedido!');
      this.router.navigate(['/cadastro-cliente']);
      return;
    }

    const cliente = JSON.parse(clienteSalvo);
    const hoje = new Date().toISOString().split('T')[0]; // YYYY-MM-DD para o DateOnly do C#

    const payloadAtendimento = {
      idPessoa: cliente.idPessoa || cliente.idpessoa,
      dataAtendimento: hoje,
      statusAtendimento: 'Pendente', // Registra como pendente aguardando tratamento administrativo
      itens: this.itens.map(i => ({
        idItem: i.id,
        idFuncionario: 0, // O backend vincula automaticamente ao funcionário padrão
        quantidade: i.quantidade,
        valorUnitario: i.preco
      }))
    };

    // Envia para a API persistir o pedido e dar baixa no estoque apenas de produtos
    this.http.post('https://localhost:7077/api/Atendimento', payloadAtendimento).subscribe({
      next: () => {
        alert('Pedido registrado como Pendente! Aguarde o tratamento administrativo.');
        this.carrinhoService.limparCarrinho();
        this.itens = [];
        this.router.navigate(['/meus-pedidos']);
      },
      error: (err) => {
        this.mensagemErro = err.error?.mensagem || 'Erro ao registrar pedido no servidor. Verifique se o cliente e funcionários estão cadastrados.';
      }
    });
  }
}