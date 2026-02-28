import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pessoa } from '../entities/pessoa.entitie';

@Injectable()
export class PessoaService {
  constructor(
    @InjectRepository(Pessoa)
    private repository: Repository<Pessoa>,
  ) {}
  // Salva os dados que vem lá do formulário
  salvar(pessoa: Pessoa) {
    return this.repository.save(pessoa);
  }
  // Traz a galera toda pra aparecer na lista do site
  listar() {
    return this.repository.find();
  }
  // Pra quando eu quiser buscar só um pelo CPF
  buscarPorCpf(cpf: string) {
    return this.repository.findOneBy({ cpf });
  }
  atualizar(cpf: string, dados: Partial<Pessoa>) {
    return this.repository.save({ ...dados, cpf });
  }
  // Apaga o registro do banco usando o CPF
  deletar(cpf: string) {
    return this.repository.delete(cpf);
  }
}
