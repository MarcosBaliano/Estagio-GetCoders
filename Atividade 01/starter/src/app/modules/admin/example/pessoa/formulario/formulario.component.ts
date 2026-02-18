import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { PessoaService } from '../pessoa.service';

@Component({
    selector: 'app-formulario',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
    templateUrl: './formulario.component.html'
})
export class FormularioComponent implements OnInit {
    pessoaForm: FormGroup;
    isEdicao: boolean = false;

    constructor(
        private _formBuilder: FormBuilder,
        private _pessoaService: PessoaService,
        private _router: Router
    ) {
        const navigation = this._router.getCurrentNavigation();
        const state = navigation?.extras.state as { data: any };

        if (state && state.data) {
            this.isEdicao = true;
            this.preencherFormulario(state.data);
        }
    }

    ngOnInit(): void {
        if (!this.pessoaForm) {
            this.iniciarFormulario();
        }
    }

    iniciarFormulario(): void {
        this.pessoaForm = this._formBuilder.group({
            cpf: ['', [Validators.required]], // Campo CPF como primeiro
            nome: ['', [Validators.required]],
            endereco: [''],
            telefone: [''],
            dataNascimento: [''],
            escolaridade: ['']
        });
    }

    preencherFormulario(dados: any): void {
        this.iniciarFormulario();
        this.pessoaForm.patchValue(dados);
        // CPF não pode ser editado pois é a chave primária
        this.pessoaForm.get('cpf')?.disable();
    }

    salvar(): void {
        if (this.pessoaForm.invalid) return;

        const dados = this.pessoaForm.getRawValue();

        if (this.isEdicao) {
            this._pessoaService.atualizar(dados).subscribe(() => {
                alert('Pessoa atualizada com sucesso!');
                this._router.navigate(['/pessoas']);
            });
        } else {
            this._pessoaService.salvar(dados).subscribe(() => {
                alert('Pessoa cadastrada com sucesso!');
                this._router.navigate(['/pessoas']);
            });
        }
    }

    voltar(): void {
        this._router.navigate(['/pessoas']);
    }
}
