import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pessoa } from './entitys/pessoa.entity';
import { PessoaController } from './controller/pessoa.controller';
import { PessoaService } from './pessoa/pessoa.service';

@Module({
  imports: [
    // Configuração do Banco de Dados (PostgreSQL)
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'estagio',
      entities: [Pessoa],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Pessoa]),
  ],
  controllers: [PessoaController],
  providers: [PessoaService],
})
export class AppModule {}
