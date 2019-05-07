import { ServicesMessages } from './../../../services/service-mensagem';
import { PessoaService } from './../../../services/pessoa.service';
import { PessoaModel } from './../../../models/pessoaModel';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/finally';
import { Router } from '@angular/router';
import { UtilHelper } from 'src/app/shared/helpers/util.helper';

@Component({
  selector: 'app-pessoa-consulta',
  templateUrl: './pessoa-consulta.component.html',
  styleUrls: ['./pessoa-consulta.component.css']
})
export class PessoaConsultaComponent implements OnInit {

  public pessoas = [];
  public loading = false;
  public idPessoa: number;
  public paginaAtual: number;
  public totalPagina: number;

  constructor(
    private pessoaService: PessoaService,
    private servicesMessages: ServicesMessages,
    private router: Router
  ) { }

  ngOnInit() {
    this.pessoaService.obterPessoas()
      .finally(() => this.loading = false)
      .subscribe(response => {
        this.pessoas = response.content;
      }, error => this.servicesMessages.handleError(error));
    this.paginaAtual = 1;
  }

  onPaginaAlterada(pagina: number) {
    this.paginaAtual = pagina;
  }

  cadastrarPessoa() {
    this.router.navigate(['cadastros/pessoa', 'novo']);
  }

  editar(pessoaModel: PessoaModel) {
    this.idPessoa = pessoaModel.id;
    this.router.navigate(['cadastros/pessoa', pessoaModel.id]);
  }

  excluir(pessoaModel: PessoaModel) {
    this.pessoaService.excluirPessoa(pessoaModel.id)
      .finally(() => this.ngOnInit())
      .subscribe(response => {
        if (response.status == 200) {
          this.servicesMessages.notification.exibirMensagemDeSucesso('Pessoa Excluída com Sucesso');
        } else {
          this.servicesMessages.notification.exibirMensagemDeErro('Pessoa não foi excluída');
        }
      });
  }

  getTelefone(pessoaModel: PessoaModel) {
    if (!UtilHelper.isNullOrUndefined(pessoaModel.telefones[0].numeroTelefone)) {
      return pessoaModel.telefones[0].numeroTelefone;
    } else {
      return null;
    }
  }

}
