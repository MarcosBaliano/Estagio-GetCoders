import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PessoaService } from '../pessoa/pessoa.service';
import { Pessoa } from '../entitys/pessoa.entity';

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
    return this.service.buscarPorCpf(cpf);
  }

  @Put(':cpf')
  update(@Param('cpf') cpf: string, @Body() pessoa: Pessoa) {
    return this.service.atualizar(cpf, pessoa);
  }

  @Delete(':cpf')
  remove(@Param('cpf') cpf: string) {
    return this.service.deletar(cpf);
  }
}
