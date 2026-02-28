import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  NotFoundException,
} from '@nestjs/common';
import { PessoaService } from './pessoa.service';
import { Pessoa } from '../entities/pessoa.entitie';

@Controller('pessoas')
export class PessoaController {
  constructor(private readonly service: PessoaService) {}

  @Post()
  create(@Body() pessoa: Pessoa) {
    return this.service.salvar(pessoa);
  }

  @Get()
  findAll() {
    return this.service.listar();
  }

  @Get(':cpf')
  findOne(@Param('cpf') cpf: string) {
    return this.service.buscarPorCpf(cpf).then((pessoa) => {
      if (!pessoa) {
        throw new NotFoundException(`Pessoa com CPF ${cpf} não encontrada`);
      }
      return pessoa;
    });
  }

  @Put(':cpf')
  update(@Param('cpf') cpf: string, @Body() pessoa: Pessoa) {
    return this.service.atualizar(cpf, pessoa);
  }

  @Delete(':cpf')
  remove(@Param('cpf') cpf: string) {
    return this.service.deletar(cpf).then((resultado) => {
      // Se o service retornar false ou null quando não encontrar o registro
      if (!resultado) {
        throw new NotFoundException(`CPF ${cpf} não encontrado para exclusão`);
      }
      return { mensagem: 'Removido com sucesso' };
    });
  }
}
