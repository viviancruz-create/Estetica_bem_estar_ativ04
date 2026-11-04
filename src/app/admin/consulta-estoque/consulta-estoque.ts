import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

export interface EstoqueItem {
  iditem: number;
  quantidade: number;
  quantidadeMinima?: number;
  nomeProduto?: string;
  iditemNavigation?: {
    item1: string;
  };
}

@Component({
  selector: 'app-estoque',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './estoque.html',
  styleUrls: ['./estoque.css']
})
export class EstoqueComponent implements OnInit {
  estoque: EstoqueItem[] = [];
  estoqueFiltrado: EstoqueItem[] = [];
  filtro: string = '';

  // Ajuste a porta da sua API C# conforme necessário
  private apiUrl = 'https://localhost:7123/api/Estoque'; 

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.carregarEstoque();
  }

  carregarEstoque(): void {
    this.http.get<EstoqueItem[]>(this.apiUrl).subscribe({
      next: (dados) => {
        this.estoque = dados;
        this.estoqueFiltrado = dados;
      },
      error: (erro) => {
        console.error('Erro ao buscar estoque:', erro);
      }
    });
  }

  filtrarEstoque(): void {
    const termo = this.filtro.toLowerCase();
    this.estoqueFiltrado = this.estoque.filter(item => {
      const nome = item.nomeProduto || item.iditemNavigation?.item1 || '';
      return nome.toLowerCase().includes(termo) || item.iditem.toString().includes(termo);
    });
  }
}