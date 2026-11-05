import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ItemPedido {
  iditem: number;
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
  private apiUrl = 'https://localhost:7077/api/Pedido';

  constructor(private http: HttpClient) {}

  getPedidosAbertos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.apiUrl}/Abertos`);
  }

  atualizarStatus(idpedido: number, novoStatus: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${idpedido}/status`, { status: novoStatus });
  }
}