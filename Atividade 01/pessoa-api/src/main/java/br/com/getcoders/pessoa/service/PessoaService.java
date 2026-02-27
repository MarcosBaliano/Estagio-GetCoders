package br.com.getcoders.pessoa.service;

import br.com.getcoders.pessoa.infrastructure.entitys.Pessoa;
import br.com.getcoders.pessoa.infrastructure.repository.PessoaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PessoaService {

    private PessoaRepository repository;

    public List<Pessoa> listarTodos() {
        return repository.findAll();
    }

    public Pessoa buscarPorCpf(String cpf) {
        // Correção: Lança exceção se não encontrar, para não retornar null [cite: 24]
        return repository.findById(cpf)
                .orElseThrow(() -> new RuntimeException("Pessoa não encontrada com o CPF: " + cpf));
    }

    public Pessoa salvar(Pessoa pessoa) {
        return repository.save(pessoa);
    }

    public void deletar(String cpf) {
        if (!repository.existsById(cpf)) {
            throw new RuntimeException("Não é possível deletar: CPF não encontrado.");
        }
        repository.deleteById(cpf);
    }
}