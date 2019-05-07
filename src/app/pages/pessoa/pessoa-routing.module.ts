
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PessoaConsultaComponent } from './pessoa-consulta/pessoa-consulta.component';
import { PessoaPanelComponent } from './cadastro/pessoa-panel.component';

const routes: Routes = [
  {
    path: '',
    component: PessoaConsultaComponent
  },
  {
    path: 'novo',
    component: PessoaPanelComponent
  },
  {
    path: ':id',
    component: PessoaPanelComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PessoaRoutingModule { }
