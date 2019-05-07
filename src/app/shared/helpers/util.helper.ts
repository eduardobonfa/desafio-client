
export class UtilHelper {

    static getDescricaoByIdNumber(codigo: number, lista: any[]): string {
        const filtered = lista.filter(tipo => tipo.codigo === codigo);
        return filtered.length > 0 ? filtered[0].descricao : '';
    }

    static isNullOrUndefined(value): boolean {
        return value === null || value === undefined || value === 'undefined';
    }

}
