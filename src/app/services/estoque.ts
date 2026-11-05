import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface EntradaProdutoDTO {
  iditem: number;
  quantidade: number;
  precoCusto?: number;
  observacao?: string;
  dataEntrada?: string;
}

export interface HistoricoEntrada {
  identrada?: number;
  iditem: number;
  nomeProduto?: string;
  quantidade: number;
  precoCusto?: number;
  dataEntrada: string;
  observacao?: string;
}

@Injectable({
  providedIn: 'root'
})
export class EstoqueService {
  // Ajuste a porta da API conforme configurado no Visual Studio
  private apiUrl = 'https://localhost:7077/api/Estoque';

  constructor(private http: HttpClient) {}

  // POST: Registrar entrada de produtos no estoque
  registrarEntrada(dto: EntradaProdutoDTO): Observable<any> {
    return this.http.post(`${this.apiUrl}/Entrada`, dto);
  }

  // GET: Obter histórico de entradas
  getHistoricoEntradas(): Observable<HistoricoEntrada[]> {
    return this.http.get<HistoricoEntrada[]>(`${this.apiUrl}/HistoricoEntradas`);
  }
}