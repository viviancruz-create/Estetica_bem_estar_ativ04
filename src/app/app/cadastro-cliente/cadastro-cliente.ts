import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteService, PessoaDTO } from '../../services/cliente';

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
    cpf: '',
    dataNascimento: '',
    sexo: '',
    email: '',
    telefone: '',
    cep: '',
    numero: '',
    complemento: ''
  };

  mensagemErro: string = '';
  mensagemSucesso: string = '';

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  // AÇÃO 1: SALVAR
  salvar(): void {
    this.mensagemErro = '';
    this.mensagemSucesso = '';

    // Limpa caracteres especiais de CPF e Telefone para converter em número (long no C#)
    const cpfNumerico = Number(this.cliente.cpf.replace(/\D/g, ''));
    const telefoneNumerico = Number(this.cliente.telefone.replace(/\D/g, ''));

    // Validações antes do envio
    if (!this.cliente.nome || this.cliente.nome.trim().length < 3) {
      this.mensagemErro = 'Informe o nome completo (mínimo 3 caracteres).';
      return;
    }

    if (!cpfNumerico || cpfNumerico.toString().length < 11) {
      this.mensagemErro = 'Informe um CPF válido com 11 dígitos.';
      return;
    }

    if (!this.cliente.dataNascimento) {
      this.mensagemErro = 'Informe a data de nascimento.';
      return;
    }

    if (!this.cliente.sexo) {
      this.mensagemErro = 'Selecione o sexo.';
      return;
    }

    if (!this.cliente.email || !this.cliente.email.includes('@')) {
      this.mensagemErro = 'Informe um e-mail válido.';
      return;
    }

    if (!telefoneNumerico || telefoneNumerico.toString().length < 10) {
      this.mensagemErro = 'Informe um telefone válido com DDD.';
      return;
    }

    if (!this.cliente.cep || !this.cliente.numero) {
      this.mensagemErro = 'Informe o CEP e o número do endereço.';
      return;
    }

    // Monta o DTO exato esperado pela API PessoaEnderecoController
    const payload: PessoaDTO = {
      nome: this.cliente.nome.trim(),
      cpf: cpfNumerico,
      dataNascimento: this.cliente.dataNascimento,
      sexo: this.cliente.sexo,
      email: this.cliente.email.trim(),
      telefone: telefoneNumerico,
      ativoPessoa: 'S',
      enderecos: [
        {
          cep: this.cliente.cep.replace(/\D/g, ''),
          numero: this.cliente.numero.trim(),
          complemento: this.cliente.complemento.trim()
        }
      ]
    };

    this.clienteService.cadastrarCliente(payload).subscribe({
      next: (res) => {
        this.mensagemSucesso = 'Cliente cadastrado com sucesso!';
        localStorage.setItem('cliente_logado', JSON.stringify(res));
        this.limparCampos();
        this.cdr.detectChanges();
      },
      error: (err) => {
        // Exibe o erro de CPF ou E-mail duplicado retornado pelo C#
        this.mensagemErro = err.error?.mensagem || 'Erro ao cadastrar cliente. Verifique os dados e tente novamente.';
        this.cdr.detectChanges();
      }
    });
  }

  // AÇÃO 2: LIMPAR
  limpar(): void {
    this.limparCampos();
    this.mensagemErro = '';
    this.mensagemSucesso = '';
  }

  private limparCampos(): void {
    this.cliente = {
      nome: '',
      cpf: '',
      dataNascimento: '',
      sexo: '',
      email: '',
      telefone: '',
      cep: '',
      numero: '',
      complemento: ''
    };
  }

  // AÇÃO 3: VOLTAR AO CATÁLOGO
  voltarAoCatalogo(): void {
    this.router.navigate(['/catalogo']);
  }
}