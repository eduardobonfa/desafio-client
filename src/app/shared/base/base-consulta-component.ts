import { AutoSaveFormGroup } from './auto-save-form-group';

export class BaseCadastroComponent {
    public data: any;
    public isUpdate: boolean;
    public idForm: number;
    public submitted: boolean;
    public form: AutoSaveFormGroup;

    private aposRealizarConsulta(response: { data: any; count: number; }) {
        this.data = response.data;
    }

}

