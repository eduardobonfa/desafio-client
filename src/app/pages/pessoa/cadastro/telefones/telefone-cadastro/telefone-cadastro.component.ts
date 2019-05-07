import { FormControl } from '@angular/forms';
import { AutoSaveFormGroup } from './../../../../../shared/base/auto-save-form-group';
import { ServicesMessages } from 'src/app/services/service-mensagem';
import { TelefoneService } from 'src/app/services/telefone.service';
import { TelefoneModel } from 'src/app/models/telefoneModel';
import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { PessoaModel } from 'src/app/models/pessoaModel';

@Component({
  selector: 'app-telefone-cadastro',
  templateUrl: './telefone-cadastro.component.html',
  styleUrls: ['./telefone-cadastro.component.css']
})
export class TelefoneCadastroComponent implements OnInit {

  @Input() public idPessoa: number;
  @Output() onClose = new EventEmitter<any>();
  @Output() onSalvar = new EventEmitter<any>();
  @Input() public idTelefone: number;
  @Input() public changed: boolean;

  public telefoneModel: TelefoneModel;
  public loading: boolean;
  public tiposTelefone: any[];
  public form: AutoSaveFormGroup;
  public submitted: boolean;

  constructor(
    private telefoneService: TelefoneService,
    private servicesMessages: ServicesMessages
  ) { }

  ngOnInit() {
    this.construirFormulario();
    this.loadTiposTelefones();
  }

  ngOnChanges() {
    this.carregarModel();
  }

  construirFormulario() {
    this.telefoneModel = new TelefoneModel();
    this.form = new AutoSaveFormGroup({
      codigoTipoTelefone: new FormControl(),
      ddi: new FormControl(),
      ddd: new FormControl(),
      numeroTelefone: new FormControl()
    });
    this.form.patchValue(this.telefoneModel);
  }

  carregarModel() {
    if (this.idTelefone) {
      this.loading = true;
      this.telefoneService.obterTelefonePorId(this.idTelefone).finally(() => this.loading = false).subscribe(response => {
        let telefone = response.content[0];
        this.telefoneModel.codigoTipoTelefone = telefone.codigoTipoTelefone;
        this.telefoneModel.ddi = telefone.ddi;
        this.telefoneModel.ddd = telefone.ddd
        this.telefoneModel.numeroTelefone = telefone.numeroTelefone;
        this.form.patchValue(this.telefoneModel);
      });
    } else {
      this.construirFormulario();
    }
  }

  close() {
    this.onClose.emit();
  }

  salvar() {
    this.submitted = true;
    if (this.form.valid) {
      this.submitted = false;
      this.loading = true;

      this.telefoneModel = new TelefoneModel();
      this.telefoneModel.codigoTipoTelefone = this.form.get('codigoTipoTelefone').value;
      this.telefoneModel.ddi = this.form.get('ddi').value;
      this.telefoneModel.ddd = this.form.get('ddd').value;
      this.telefoneModel.numeroTelefone = this.form.get('numeroTelefone').value;
      this.telefoneModel.pessoa = new PessoaModel();
      this.telefoneModel.pessoa.id = this.idPessoa;

      if (this.idTelefone) {
        this.telefoneModel.id = this.idTelefone;
        this.telefoneService.editarTelefone(this.telefoneModel)
          .finally(() => this.loading = false)
          .subscribe(() => this.aposSalvar(),
            error => this.servicesMessages.handleError(error));
      } else {
        this.telefoneService.adicionarTelefone(this.telefoneModel)
          .finally(() => this.loading = false)
          .subscribe(() => this.aposSalvar(),
            error => this.servicesMessages.handleError(error));
      }
    }
  }

  aposSalvar() {
    this.servicesMessages.notification.exibirMensagemDeSucesso('Telefone salvo com sucesso');
    this.onSalvar.emit();
    this.close();
  }

  loadTiposTelefones() {
    this.telefoneService.obterTiposTelefones()
      .subscribe(response => {
        this.tiposTelefone = response;
      }, error => this.servicesMessages.handleError(error));
  }
}
