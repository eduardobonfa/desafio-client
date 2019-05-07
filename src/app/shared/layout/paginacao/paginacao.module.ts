import {NgModule} from '@angular/core';

import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {PaginacaoComponent} from './paginacao.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  exports: [PaginacaoComponent],
  declarations: [PaginacaoComponent]
})
export class PaginacaoModule {
}
