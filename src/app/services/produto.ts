import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interface das informações da tabela Item (relação trazida pelo EF Core)
export interface Item {
  iditem?: number;
  idcategoria?: number;
  item1: string;
  descricaoItem: string;
  preco: number;
  tipoItem?: string;
  ativoProdutoServico?: string;
}

// Interface que espelha o modelo Produto retornado pelo C#
export interface Produto {
  iditem: number;
  codigoPreco?: string;
  precoVenda?: number;
  unidade?: string;
  iditemNavigation?: Item;
}

// Interface enviada no POST e PUT para o backend
export interface ProdutoDTO {
  idCategoria: number;
  item: string;
  descricaoItem: string;
  preco: number;
  tipoItem: string;
  ativoProdutoServico: string;
  codigoVenda: string;
  precoVenda: number;
  unidade: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  // Confirme se a porta da API no seu Visual Studio é a 7123 ou altere aqui
  private apiUrl = 'https://localhost:7123/api/ProdutoItem';

  constructor(private http: HttpClient) {}

  // GET: Listar todos os produtos
  getProdutos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.apiUrl);
  }

  // GET: Obter produto por ID
  getProdutoById(id: number): Observable<Produto> {
    return this.http.get<Produto>(`${this.apiUrl}/${id}`);
  }

  // POST: Cadastrar novo produto
  cadastrarProduto(dto: ProdutoDTO): Observable<any> {
    return this.http.post(this.apiUrl, dto);
  }

  // PUT: Atualizar produto existente
  atualizarProduto(id: number, dto: ProdutoDTO): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, dto);
  }

  // DELETE: Excluir produto
  excluirProduto(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}