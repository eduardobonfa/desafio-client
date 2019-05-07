import { PessoaModel } from './pessoaModel';
export class TelefoneModel {
    public id?: number;
    public pessoa: PessoaModel;
    public codigoTipoTelefone: number;
    public ddi: number;
    public ddd: number;
    public numeroTelefone: string;
}
