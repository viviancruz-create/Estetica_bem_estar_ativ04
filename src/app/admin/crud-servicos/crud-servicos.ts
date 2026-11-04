import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServicoService, Servico, ServicoDTO } from '../../services/servico';

@Component({
  selector: 'app-crud-servicos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crud-servicos.html',
  styleUrls: ['./crud-servicos.css']
})
export class CrudServicosComponent implements OnInit {
  servicos: Servico[] = [];
  editandoId: number | null = null;

  form: ServicoDTO = this.obterFormVazio();

  constructor(private servicoService: ServicoService) {}

  ngOnInit(): void {
    this.carregarServicos();
  }

  obterFormVazio(): ServicoDTO {
    return {
      nome: '',
      descricao: '',
      preco: 0,
      duracaoMinutos: 30,
      ativo: true
    };
  }

  carregarServicos(): void {
    this.servicoService.getServicos().subscribe({
      next: (dados: Servico[]) => (this.servicos = dados),
      error: (err: any) => console.error('Erro ao carregar serviços:', err)
    });
  }

  salvar(): void {
    if (this.editandoId !== null) {
      this.servicoService.atualizarServico(this.editandoId, this.form).subscribe({
        next: () => {
          alert('Serviço atualizado com sucesso!');
          this.cancelarEdicao();
          this.carregarServicos();
        },
        error: (err: any) => alert('Erro ao atualizar serviço: ' + (err.error?.mensagem || err.message))
      });
    } else {
      this.servicoService.cadastrarServico(this.form).subscribe({
        next: () => {
          alert('Serviço cadastrado com sucesso!');
          this.cancelarEdicao();
          this.carregarServicos();
        },
        error: (err: any) => alert('Erro ao cadastrar serviço: ' + (err.error?.mensagem || err.message))
      });
    }
  }

  editar(s: Servico): void {
    this.editandoId = s.id;
    this.form = {
      nome: s.nome,
      descricao: s.descricao,
      preco: s.preco,
      duracaoMinutos: s.duracaoMinutos || 30,
      ativo: s.ativo !== undefined ? s.ativo : true
    };
  }

  excluir(id: number): void {
    if (confirm(`Deseja realmente excluir o serviço #${id}?`)) {
      this.servicoService.excluirServico(id).subscribe({
        next: () => {
          alert('Serviço excluído com sucesso!');
          this.carregarServicos();
        },
        error: (err: any) => alert('Erro ao excluir serviço: ' + (err.error?.mensagem || err.message))
      });
    }
  }

  cancelarEdicao(): void {
    this.editandoId = null;
    this.form = this.obterFormVazio();
  }
}