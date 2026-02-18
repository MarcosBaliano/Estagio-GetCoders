package br.com.getcoders.pessoa.controller;

import br.com.getcoders.pessoa.infrastructure.entitys.Pessoa;
import br.com.getcoders.pessoa.infrastructure.repository.PessoaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pessoas")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class PessoaController {
    private final PessoaRepository repository;

    // Salva os dados que vem lá do formulário
    @PostMapping
    public Pessoa salvar(@RequestBody Pessoa pessoa){
        return repository.save(pessoa);
    }

    // Traz a galera toda pra aparecer na lista do site
    @GetMapping
    public List<Pessoa> listar(){
        return repository.findAll();
    }

    //busca só um pelo CPF pra barra de pesquisa
    @GetMapping("/{cpf}")
    public Pessoa buscarPorCpf(@PathVariable String cpf) {
        return repository.findById(cpf).orElse(null);
    }

    // Apaga o registro do banco usando o CPF que vem na URL
    @DeleteMapping("/{cpf}")
    public void deletar(@PathVariable String cpf){
        repository.deleteById(cpf);
    }

    //atualiza os dados da pessoa
    @PutMapping("/{cpf}")
    public Pessoa atualizar(@PathVariable String cpf, @RequestBody Pessoa pessoa) {
        pessoa.setCpf(cpf);
        return repository.save(pessoa);
    }
}