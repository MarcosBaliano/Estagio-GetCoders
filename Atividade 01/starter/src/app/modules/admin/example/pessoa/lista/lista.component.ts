import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PessoaService } from '../pessoa.service';
import { Pessoa } from '../pessoa.modelo';

@Component({

    selector: 'app-lista',
    standalone: true,
    //Imports pro Angular não dar erro nas tags do Material
    imports: [CommonModule, MatButtonModule, MatIconModule],
    templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {
    pessoas: Pessoa[] = [];

    constructor(private _pessoaService: PessoaService, private _router: Router) { }

    ngOnInit(): void {
        this.carregarPessoas();
    }

    carregarPessoas(): void {
        this._pessoaService.listar().subscribe((dados) => {
            this.pessoas = dados as Pessoa[];
        });
    }

    abrirFormulario(): void {
        this._router.navigate(['/pessoas/novo']);
    }

    editar(pessoa: Pessoa): void {

        this._router.navigate(['/pessoas/novo'], { state: { data: pessoa } });
    }

    deletar(cpf: string): void {
        if (confirm('Deseja realmente excluir esta pessoa?')) {
            this._pessoaService.deletar(cpf).subscribe(() => {
                alert('Pessoa removida com sucesso!');
                this.carregarPessoas();
            });
        }
    }
pesquisar(cpf: string) {
  if (!cpf) {
    alert('Por favor, digite um CPF!');
    return;
  }

  this._pessoaService.buscarPorCpf(cpf).subscribe({
    next: (pessoa) => {
        alert(`PESSOA ENCONTRADA! \n\nNome: ${pessoa.nome} \nCPF: ${pessoa.cpf}`);
    },
    error: (erro) => {
        alert('Nenhuma pessoa encontrada com este CPF.');
    }
});
}

listarTodas(): void {
    this._pessoaService.listar().subscribe({
        next: (dados) => {
            this.pessoas = dados;
        },
        error: (err) => {
            console.error('Erro ao carregar a lista:', err);
        }
    });
}
}
