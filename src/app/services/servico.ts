import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Servico {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  duracaoMinutos?: number;
  ativo?: boolean;
}

export interface ServicoDTO {
  nome: string;
  descricao: string;
  preco: number;
  duracaoMinutos: number;
  ativo: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ServicoService {
  // Ajuste a porta da API C# se necessário
  private apiUrl = 'https://localhost:7123/api/Servico';

  constructor(private http: HttpClient) {}

  getServicos(): Observable<Servico[]> {
    return this.http.get<Servico[]>(this.apiUrl);
  }

  getServicoById(id: number): Observable<Servico> {
    return this.http.get<Servico>(`${this.apiUrl}/${id}`);
  }

  cadastrarServico(dto: ServicoDTO): Observable<any> {
    return this.http.post(this.apiUrl, dto);
  }

  atualizarServico(id: number, dto: ServicoDTO): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, dto);
  }

  excluirServico(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}