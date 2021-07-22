import { Action } from 'redux';

export type ClientsState = {
    readonly status: 'idle' | 'loading' | 'loaded' | 'fail',
    readonly pointer: number,
    readonly lastKey: string,
    readonly data: { [key: string]: Client[] },
    readonly loadCompleted: boolean,
    readonly holdInfiniteLoader: boolean,
    readonly currentPath: string,
    readonly currentQuery: string,
    readonly currentKey: string,
    readonly currentUrl: string,
    readonly currentQuantity: number
}


export interface ClientsAction extends Action {
    key: string,
    payload: Client[],
    pointer: number,
    quantity: number,
    url: string,
    error?: any,
    path?: string,
    query?: string,
}

export interface Client {
    nome: string,
    cpf: string,
    email: string,
    endereco: {
        cep: number,
        rua: string,
        numero: number,
        cidade: string
    }
}

export type ClientsRequestResponse = Client[] | {}; //Como estamos usando json server não há um padrao esquematizado de resposta.
