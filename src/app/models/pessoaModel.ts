import { TelefoneModel } from "./telefoneModel";

export class PessoaModel {
    public id?: number;
    public nome: string;
    public idade: number;
    public codigoTipoEndereco: number;
    public nomeEndereco: string;
    public cep: string;
    public numero: string;
    public telefones: TelefoneModel;
}
