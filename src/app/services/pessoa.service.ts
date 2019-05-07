import { Injectable } from '@angular/core';
import { PessoaModel } from '../models/pessoaModel';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  constructor(private http: HttpClient) { }

  adicionarPessoa(model: PessoaModel): Observable<any> {
    return this.http.post(`http://localhost:9000/desafio-api/v1/pessoas`, model);
  }
  editarPessoa(model: PessoaModel): Observable<any> {
    return this.http.put(`http://localhost:9000/desafio-api/v1/pessoas`, model);
  }
  excluirPessoa(idPessoa: number): Observable<any> {
    return this.http.delete(`http://localhost:9000/desafio-api/v1/pessoas/${idPessoa}`, {observe : 'response'});
  }
  obterPessoaPorId(idPessoa: number): Observable<any> {
    return this.http.get(`http://localhost:9000/desafio-api/v1/pessoas?id=${idPessoa}`);
  }
  obterPessoas(): Observable<any> {
    return this.http.get(`http://localhost:9000/desafio-api/v1/pessoas`);
  }
  obterTiposEnderecos(): Observable<any> {
    return this.http.get(`http://localhost:9000/desafio-api/v1/pessoas/tipos-endereco`);
  }
}
