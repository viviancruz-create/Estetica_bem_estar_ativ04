import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, switchMap } from 'rxjs';

export interface ItemPedido {
  iditem: number;
  idFuncionario: number;
  nomeItem: string;
  quantidade: number;
  precoUnitario: number;
  tipo: string;
}

export interface Pedido {
  idpedido: number;
  nomeCliente: string;
  telefoneCliente?: string;
  dataPedido: string;
  valorTotal: number;
  status: string;
  itens: ItemPedido[];
}

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private apiUrl = 'https://localhost:7077/api/Atendimento';

  constructor(private http: HttpClient) {}

  getPedidosAbertos(): Observable<Pedido[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(atendimentos =>
        atendimentos
          // Filtra tanto 'Pendente' (criado pelo carrinho) quanto 'Aberto'
          .filter(a => a.statusAtendimento === 'Pendente' || a.statusAtendimento === 'Aberto')
          .map(a => {
            const itensMapeados: ItemPedido[] = (a.itens || []).map((i: any) => ({
              iditem: i.idItem,
              idFuncionario: i.idFuncionario,
              nomeItem: i.item,
              quantidade: i.quantidade,
              precoUnitario: i.valorUnitario,
              tipo: ''
            }));

            const total = itensMapeados.reduce(
              (acc, item) => acc + item.quantidade * item.precoUnitario,
              0
            );

            return {
              idpedido: a.idAtendimento,
              nomeCliente: a.nomePessoa,
              dataPedido: a.dataAtendimento,
              valorTotal: total,
              status: a.statusAtendimento,
              itens: itensMapeados
            };
          })
      )
    );
  }

  atualizarStatus(idpedido: number, novoStatus: string): Observable<any> {
    // Busca o atendimento atual para enviar o AtendimentoPutDTO completo exigido pelo PutAtendimento
    return this.http.get<any>(`${this.apiUrl}/${idpedido}`).pipe(
      switchMap(atendimentoAtual => {
        const payloadPut = {
          statusAtendimento: novoStatus,
          itens: (atendimentoAtual.itens || []).map((i: any) => ({
            idItem: i.idItem,
            idFuncionario: i.idFuncionario,
            quantidade: i.quantidade,
            valorUnitario: i.valorUnitario
          }))
        };
        return this.http.put(`${this.apiUrl}/${idpedido}`, payloadPut);
      })
    );
  }
}