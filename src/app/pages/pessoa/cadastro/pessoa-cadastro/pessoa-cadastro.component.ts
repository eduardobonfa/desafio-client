import { FormControl } from '@angular/forms';
import { AutoSaveFormGroup } from './../../../../shared/base/auto-save-form-group';
import { ServicesMessages } from './../../../../services/service-mensagem';
import { PessoaService } from './../../../../services/pessoa.service';
import { PessoaModel } from './../../../../models/pessoaModel';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  public pessoaModel: PessoaModel;
  public loading: boolean;
  public modalTelefoneVisible: boolean;
  public idPessoa: number;
  public idTelefone: number;
  public valueSelect: boolean;
  public form: AutoSaveFormGroup;
  public isUpdate: Boolean;
  public submitted: boolean;
  public tiposEndereco: any[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pessoaService: PessoaService,
    private servicesMessages: ServicesMessages
  ) {
    this.pessoaModel = new PessoaModel();
  }

  ngOnInit() {
    this.construirFormulario();
    this.loadTiposEnderecos();
    this.obterDadosIniciais();
  }

  construirFormulario() {
    this.pessoaModel = new PessoaModel();
    this.form = new AutoSaveFormGroup({
      nome: new FormControl(),
      idade: new FormControl(),
      codigoTipoEndereco: new FormControl(),
      cep: new FormControl(),
      numero: new FormControl(),
      nomeEndereco: new FormControl()
    });
    this.form.patchValue(this.pessoaModel);
  }

  obterDadosIniciais() {
    this.isUpdate = false;
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.idPessoa = id;
        this.pessoaService.obterPessoaPorId(this.idPessoa).finally(() => this.loading = false).subscribe(response => {
          let pessoa = response.content[0];
          this.pessoaModel.id = id;
          this.pessoaModel.nome = pessoa.nome;
          this.pessoaModel.idade = pessoa.idade;
          this.pessoaModel.codigoTipoEndereco = pessoa.codigoTipoEndereco
          this.pessoaModel.cep = pessoa.cep;
          this.pessoaModel.numero = pessoa.numero;
          this.pessoaModel.nomeEndereco = pessoa.nomeEndereco;
          this.form.patchValue(this.pessoaModel);
          this.isUpdate = true;
        });
      } else {
        this.loading = false;
      }
    });
  }

  salvar() {
    this.submitted = true;

    if (this.form.valid) {
      this.submitted = false;
      this.pessoaModel.nome = this.form.get('nome').value;
      this.pessoaModel.idade = this.form.get('idade').value;
      this.pessoaModel.codigoTipoEndereco = this.form.get('codigoTipoEndereco').value;
      this.pessoaModel.cep = this.form.get('cep').value;
      this.pessoaModel.numero = this.form.get('numero').value;
      this.pessoaModel.nomeEndereco = this.form.get('nomeEndereco').value;

      if (!this.idPessoa) {
        this.pessoaService.adicionarPessoa(this.pessoaModel)
          .subscribe(response => {
            this.idPessoa = response.idPessoa;
            this.aposSalvar(response);
          }, error => this.servicesMessages.handleError(error));
      } else {
        this.pessoaModel.id = this.idPessoa;
        this.pessoaService.editarPessoa(this.pessoaModel)
          .subscribe(() => this.aposSalvar(undefined),
            error => this.servicesMessages.handleError(error));
      }
    }
  }

  aposSalvar(response: any) {
    this.servicesMessages.notification.exibirMensagemDeSucesso('Pessoa Salva com Sucesso');
    if (response) {
      this.router.navigate(['cadastros/pessoa', response.id]);
    }
  }

  cancelar() {
    this.router.navigate(['cadastros/pessoa']);
  }

  onInserirTelefone($event: any) {
    this.idTelefone = undefined;
    this.modalTelefoneVisible = true;
  }

  onEditarTelefone($event: any) {
    this.idTelefone = $event.id;
    this.modalTelefoneVisible = true;
  }

  onCloseTelefone() {
    this.modalTelefoneVisible = false;
  }

  loadTiposEnderecos() {
    this.pessoaService.obterTiposEnderecos()
      .subscribe(response => {
        this.tiposEndereco = response;
      }, error => this.servicesMessages.handleError(error));
  }

}
