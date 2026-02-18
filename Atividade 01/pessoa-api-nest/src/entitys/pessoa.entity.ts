import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class Pessoa {
  @PrimaryColumn({ length: 14 })
  cpf: string;

  @Column()
  nome: string;

  @Column({ nullable: true })
  endereco: string;

  @Column()
  telefone: string;

  @Column({ type: 'date', name: 'data_nascimento' })
  dataNascimento: string;

  @Column()
  escolaridade: string;
}
