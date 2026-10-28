import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-cliente',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastro-cliente.html',
  styleUrl: './cadastro-cliente.css'
})
export class CadastroClienteComponent {
  cliente = {
    nome: '',
    email: '',
    telefone: '',
    endereco: ''
  };

  constructor(private router: Router) {}

  salvar(): void {
    if (!this.cliente.nome || !this.cliente.email) {
      alert('Por favor, preencha o nome e o e-mail!');
      return;
    }
    
    // Salva os dados localmente para simulação
    localStorage.setItem('cliente', JSON.stringify(this.cliente));
    alert('Cadastro realizado com sucesso!');
    this.router.navigate(['/catalogo']);
  }
}