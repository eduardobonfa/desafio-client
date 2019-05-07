import { PessoaPanelComponent } from './cadastro/pessoa-panel.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PessoaRoutingModule } from './pessoa-routing.module';
import { NgModule } from '@angular/core';
import { ServicesMessages } from './../../services/service-mensagem';
import { TelefoneCadastroComponent } from './cadastro/telefones/telefone-cadastro/telefone-cadastro.component';
import { TelefoneConsultaComponent } from './cadastro/telefones/telefone-consulta/telefone-consulta.component';
import { PessoaCadastroComponent } from './cadastro/pessoa-cadastro/pessoa-cadastro.component';
import { PessoaConsultaComponent } from './pessoa-consulta/pessoa-consulta.component';
import { PessoaService } from 'src/app/services/pessoa.service';
import { TelefoneService } from 'src/app/services/telefone.service';
import { ProgressSpinnerModule, SpinnerModule, DataTableModule, MessagesModule, DialogModule, DropdownModule, TooltipModule } from 'primeng/primeng';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    TooltipModule,
    DropdownModule,
    DialogModule,
    MessagesModule,
    DataTableModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    SpinnerModule,
    ProgressSpinnerModule,
    PessoaRoutingModule
    ],
  declarations: [
    PessoaConsultaComponent,
    TelefoneCadastroComponent,
    TelefoneConsultaComponent,
    PessoaCadastroComponent,
    PessoaPanelComponent
  ],
  providers: [
    ServicesMessages,
    PessoaService,
    TelefoneService
  ],
  exports: [
    PessoaConsultaComponent,
    TelefoneCadastroComponent,
    TelefoneConsultaComponent,
    PessoaCadastroComponent,
    PessoaPanelComponent
  ]
})

export class PessoaModule { }
