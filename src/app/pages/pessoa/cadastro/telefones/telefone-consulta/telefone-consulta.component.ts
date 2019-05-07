import { UtilHelper } from './../../../../../shared/helpers/util.helper';
import { TipoEnum } from './../../../../../models/tipoEnum';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TelefoneModel } from 'src/app/models/telefoneModel';
import { TelefoneService } from 'src/app/services/telefone.service';
import { ServicesMessages } from 'src/app/services/service-mensagem';
import 'rxjs/add/operator/finally';

@Component({
  selector: 'app-telefone-consulta',
  templateUrl: './telefone-consulta.component.html',
  styleUrls: ['./telefone-consulta.component.css']
})
export class TelefoneConsultaComponent implements OnInit {

  public telefones = [];
  public tiposTelefone: TipoEnum[];
  public loading = false;
  public changed: boolean;
  @Input() idPessoa: number;
  @Output() onInserirTelefone = new EventEmitter<any>();
  @Output() onEditarTelefone = new EventEmitter<any>();

  constructor(
    private telefoneService: TelefoneService,
    private servicesMessages: ServicesMessages
  ) { }

  ngOnInit() {
    this.telefoneService.obterTiposTelefones()
      .subscribe(response => {
        this.tiposTelefone = response;
        this.loadTelefones();
      }, error => this.servicesMessages.handleError(error));

  }

  loadTelefones() {
    this.telefoneService.obterTelefonesPorPessoaId(this.idPessoa)
      .finally(() => this.loading = false)
      .subscribe(response => {
        this.telefones = response.content;
      }, error => this.servicesMessages.handleError(error));
  }

  ngOnChanges() {
    this.ngOnInit();
  }

  onSalvar() {
    this.ngOnInit();
  }

  novo() {
    this.changed = !this.changed;
    this.onInserirTelefone.emit();
  }

  editar(telefoneModel: TelefoneModel) {
    this.changed = !this.changed;
    this.onEditarTelefone.emit({ id: telefoneModel.id });
  }

  excluir(telefoneModel: TelefoneModel) {
    this.telefoneService.excluirTelefone(telefoneModel.id)
      .finally(() => this.ngOnInit())
      .subscribe(response => {
        if (response.status == 200) {
          this.servicesMessages.notification.exibirMensagemDeSucesso('Telefone Excluído com Sucesso');
        } else {
          this.servicesMessages.notification.exibirMensagemDeErro('Telefone não foi excluído');
        }
      });

  }

  getTipoTelefone(tipoTelefone: number) {
    return UtilHelper.getDescricaoByIdNumber(tipoTelefone, this.tiposTelefone);
  }

  cadastrarTelefone() {
    this.changed = !this.changed;
    this.onInserirTelefone.emit();
  }
}
