package br.com.getcoders.pessoa.infrastructure.entitys;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;

import java.time.LocalDate;


@Data
@Entity

public class Pessoa {
    @Id
    private String cpf;
    private String nome;
    private String endereco;
    private String telefone;
    private LocalDate dataNascimento;
    private String escolaridade;
}
