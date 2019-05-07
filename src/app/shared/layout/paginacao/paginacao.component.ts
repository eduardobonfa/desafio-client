import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-paginacao',
    templateUrl: 'paginacao.component.html',
    styleUrls: ['paginacao.component.css']
})

export class PaginacaoComponent {

    @Input()
    get pagina(): number {
        return this.paginaAtual;
    }
    set pagina(p: number) {
        if (p !== undefined) {
            this.paginaAtual = p;
        }
    }

    @Input()
    get totalPaginas(): number {
        return this.totalPagina;
    }
    set totalPaginas(p: number) {
        if (p !== undefined) {
            this.totalPagina = p;
        }
    }

    @Output() paginaAlterada = new EventEmitter<any>();

    public paginaAtual = 1;
    public paginaModel = 1;
    public totalPagina = 1;
    public mostrarTxtPaginacao = false;
    public exibirAlertaDePaginaInvalida = false;

    alterarPagina(pagina: number) {
        if (pagina >= 1) {
            this.pagina = pagina;
            this.paginaAtual = pagina;
            this.paginaAlterada.emit(this.paginaAtual);
            this.mostrarTxtPaginacao = false;
        }
    }

    mostrarTxtPagina(event: any) {
        this.paginaModel = this.paginaAtual;
        this.mostrarTxtPaginacao = true;
        const txt = event.target.parentNode.children[0].children[0];
        setTimeout(() => {
            txt.focus();
            txt.select();
        }, 100);
    }

    avancarPagina() {
        this.alterarPagina(this.paginaAtual + 1);
    }

    voltarPagina() {
        this.alterarPagina(this.paginaAtual - 1);
    }

    onTxtPaginaEnterPressed() {
        if (this.paginaModel <= this.totalPagina) {
            this.alterarPagina(this.paginaModel);
        } else {
            this.paginaModel = this.totalPagina;
        }
    }

    onTxtPaginaKeyUp() {
        this.exibirAlertaDePaginaInvalida = (this.paginaModel < 1) || (this.paginaModel > this.totalPagina);
    }

    onTxtPaginaChanged() {
        this.exibirAlertaDePaginaInvalida = (this.paginaModel < 1) || (this.paginaModel > this.totalPagina);
    }

    onTxtPaginaEscPressed() {
        this.paginaModel = this.paginaAtual;
        this.mostrarTxtPaginacao = false;
        this.exibirAlertaDePaginaInvalida = false;
    }

    onTxtPaginaBlur() {
        setTimeout(() => {
            this.paginaModel = this.paginaAtual;
            this.mostrarTxtPaginacao = false;
            this.exibirAlertaDePaginaInvalida = false;
        }, 100);
    }

    somenteNumeroKeydown(event: any): any {
        return !((event.keyCode >= 65 && event.keyCode <= 90)
            || (event.keyCode >= 187 && event.keyCode <= 190)
            || event.keyCode === 107
            || event.keyCode === 109
            || event.keyCode === 110
            || event.keyCode === 194);
    }
}
