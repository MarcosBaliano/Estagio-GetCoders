import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PessoaService {


    private api = 'http://localhost:3000/pessoas'; //'http://localhost:8086/pessoas' PARA SPRINGBOOT


    constructor(private http: HttpClient) {}


    salvar(pessoa: any): Observable<any> {
        return this.http.post(this.api, pessoa);
    }


    listar(): Observable<any> {
        return this.http.get(this.api);
    }



   atualizar(pessoa: any): Observable<any> {
    return this.http.put(`${this.api}/${pessoa.cpf}`, pessoa);
}


  buscarPorCpf(cpf: string): Observable<any> {
    return this.http.get(`${this.api}/${cpf}`);
}

    deletar(cpf: string): Observable<any> {
        return this.http.delete(`${this.api}/${cpf}`);
    }
}
