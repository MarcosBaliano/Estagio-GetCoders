package br.com.getcoders.pessoa.infrastructure.repository;

import br.com.getcoders.pessoa.infrastructure.entitys.Pessoa;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PessoaRepository
        extends JpaRepository<Pessoa, String> {
}
