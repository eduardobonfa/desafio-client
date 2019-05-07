import { Injectable } from '@angular/core';
import { TelefoneModel } from '../models/telefoneModel';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TelefoneService {

  constructor(private http: HttpClient) { }

  adicionarTelefone(model: TelefoneModel): Observable<any> {
    return this.http.post(`http://localhost:9000/desafio-api/v1/telefones`, model);
  }
  editarTelefone(model: TelefoneModel): Observable<any> {
    return this.http.put(`http://localhost:9000/desafio-api/v1/telefones`, model);
  }
  excluirTelefone(idTelefone: number): Observable<any> {
    return this.http.delete(`http://localhost:9000/desafio-api/v1/telefones/${idTelefone}`, {observe : 'response'});
  }
  obterTelefonePorId(idTelefone: number): Observable<any> {
    return this.http.get(`http://localhost:9000/desafio-api/v1/telefones?id=${idTelefone}`);
  }
  obterTelefones(): Observable<any> {
    return this.http.get(`http://localhost:9000/desafio-api/v1/telefones/todos`);
  }
  obterTelefonesPorPessoaId(idPessoa: number): Observable<any> {
    return this.http.get(`http://localhost:9000/desafio-api/v1/telefones?pessoa.id=${idPessoa}`);
  }
  obterTiposTelefones(): Observable<any> {
    return this.http.get(`http://localhost:9000/desafio-api/v1/telefones/tipos`);
  }
}
