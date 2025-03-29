import axios from "axios";

export default class ConsultCNPJService {

    private url: string = 'https://publica.cnpj.ws';
    constructor() { }

    async get(inputCnpj: string) {

        const cnpj = inputCnpj.replace('.', '').replace('/', '').trim();
        const result = await axios.get(`${this.url}/${cnpj}`, { timeout: 3500 });

        if (result.status === 200) {
            return result.data;
        }

        throw new Error('ERRO AO CONSULTAR A API DE CNPJ');

    }


}
