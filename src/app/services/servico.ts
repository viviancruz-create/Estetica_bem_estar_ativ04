import { Injectable } from '@angular/core';

export interface Servico {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  duracaoMinutos: number;
}

@Injectable({
  providedIn: 'root'
})
export class ServicoService {
  private servicos: Servico[] = [
    {
      id: 1,
      nome: 'Limpeza de Pele Profunda',
      descricao: 'Remoção de impurezas e renovação celular.',
      preco: 150.00,
      duracaoMinutos: 60
    },
    {
      id: 2,
      nome: 'Massagem Relaxante',
      descricao: 'Alívio de tensões e bem-estar corporal.',
      preco: 180.00,
      duracaoMinutos: 50
    }
  ];

  getServicos(): Servico[] {
    return this.servicos;
  }
}