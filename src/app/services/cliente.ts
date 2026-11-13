import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface EnderecoDTO {
  idpessoa?: number;
  cep: string;
  numero: string;
  complemento?: string;
}

export interface PessoaDTO {
  idPessoa?: number;
  nome: string;
  cpf: number;
  dataNascimento: string;
  sexo: string;
  email: string;
  telefone: number;
  ativoPessoa: string;
  enderecos: EnderecoDTO[];
}

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl = 'https://localhost:7077/api/PessoaEndereco';

  constructor(private http: HttpClient) {}

  cadastrarCliente(dados: PessoaDTO): Observable<PessoaDTO> {
    return this.http.post<PessoaDTO>(this.apiUrl, dados);
  }

  getClientes(): Observable<PessoaDTO[]> {
    return this.http.get<PessoaDTO[]>(this.apiUrl);
  }
}