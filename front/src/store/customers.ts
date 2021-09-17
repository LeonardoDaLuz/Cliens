
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Action } from 'redux';
import { AppDispatch, AppThunk, RootState } from '.';
import config from '../config';
import { mergePathWithQueryAndQuery } from '../utils/mergePathWithQueryAndQuery';
import { waitForSeconds } from '../utils/waitForSeconds';
import { FormularyType } from '../components/EditarCliente';
import { useHistory } from 'react-router';
import { logout } from './user';

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
    readonly currentQuantity: number,
    readonly reloadTrigger: boolean;
}

type Mutable<T> = {
    -readonly [P in keyof T]: T[P]
};

export interface ClientsAction {
    key?: string,
    payload?: Client[],
    pointer?: number,
    quantity?: number,
    url?: string,
    error?: any,
    path?: string,
    query?: string,
    id?: number
}

export interface Client {
    id: number,
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

export type ClientsRequestResponse = Client[]; //Como estamos usando json server não há um padrao esquematizado de resposta.

const initialState: ClientsState = {
    status: 'idle',
    pointer: 0,
    lastKey: '',
    data: {},
    loadCompleted: false,
    holdInfiniteLoader: false,
    currentPath: '',
    currentQuery: '',
    currentKey: '',
    currentUrl: '',
    currentQuantity: 30,
    reloadTrigger: false,
}

const customersSlice = createSlice({
    name: 'customers',
    initialState,
    reducers: {
        reconfigureInfiniteLoader: (state: Mutable<ClientsState>, action: PayloadAction<ClientsAction>) => {
            state.holdInfiniteLoader = true;
            state.loadCompleted = false;
            state.pointer = 0;
            state.currentQuantity = action.payload.quantity ? action.payload.quantity : state.currentQuantity;
            state.reloadTrigger = true;
            if (action.payload.path && action.payload.query !== undefined) {
                state.currentPath = action.payload.path;
                state.currentQuery = action.payload.query;
                state.currentKey = mergePathWithQueryAndQuery(action.payload.path, action.payload.query);
                state.currentUrl = config.apiUrl + mergePathWithQueryAndQuery(state.currentKey, '&_start=' + state.pointer + '&_limit=' + state.currentQuantity);
            } else {
                console.error('action.path or action.query not found');
            }
        },
        infiniteCustomerLoaderStop: (state: Mutable<ClientsState>) => {
            state.holdInfiniteLoader = false;
        },
        customerLoaderStart: (state: Mutable<ClientsState>, action: PayloadAction<ClientsAction>) => {
            state.reloadTrigger = false;
            state.status = 'loading';
            state.lastKey = action.payload.key;
            state.currentUrl = config.apiUrl + mergePathWithQueryAndQuery(state.currentKey, '&_start=' + state.pointer + '&_limit=' + state.currentQuantity);
        },
        customerLoaderSuccess: (state: Mutable<ClientsState>, action: PayloadAction<ClientsAction>) => {

            state.status = 'loaded';

            if (state.data[action.payload.key])
                state.data[action.payload.key].splice(action.payload.pointer, action.payload.payload.length, ...action.payload.payload);
            else
                state.data[action.payload.key] = action.payload.payload;


            if (state.lastKey === action.payload.key && action.payload.payload.length < action.payload.quantity)
                state.loadCompleted = true;
            else
                state.loadCompleted = false;

            state.lastKey = action.payload.key;

            state.pointer = action.payload.pointer + action.payload.payload.length;
        },
        clientSearchFailure: (state: Mutable<ClientsState>, action: PayloadAction<ClientsAction>) => {
            state.status = 'fail';
        },
        infiniteLoaderPointerReset: (state: Mutable<ClientsState>) => {
            state.loadCompleted = false;
            state.pointer = 0;
        },
        previewDeleteCustomer: (state: Mutable<ClientsState>, action: PayloadAction<ClientsAction>) => {
            state.data[state.currentKey].forEach((item: Client, index: number) => {
                if (item.id === action.payload.id) {
                    state.data[state.currentKey].splice(index, 1);
                }
            })
        }
    }
})

export default customersSlice.reducer;

export const { reconfigureInfiniteLoader, infiniteCustomerLoaderStop, infiniteLoaderPointerReset, customerLoaderStart, customerLoaderSuccess, clientSearchFailure, previewDeleteCustomer } = customersSlice.actions;


export const infiniteCustomerLoaderThunk = (path = '', query = '', quantity = 30): AppThunk => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {

        dispatch({ type: 'customers/infiniteCustomerLoaderStart' })

        dispatch(reconfigureInfiniteLoader({ path, query, quantity }));

        await waitForSeconds(0.1);

        let customersState = getState().customers;

        while (customersState.holdInfiniteLoader) {

            if (customersState.reloadTrigger || (!customersState.loadCompleted && window.pageYOffset > document.body.clientHeight - window.innerHeight - 3000 || (customersState.pointer < customersState.data[customersState.currentKey].length - customersState.currentQuantity))) {
                await loadMoreClients(dispatch, getState);
            } else {
                await waitForSeconds(0.1);
            }
            customersState = getState().customers;
        }

        dispatch(infiniteCustomerLoaderStop())
    }
}

export async function loadMoreClients(dispatch: AppDispatch, getState: () => RootState) {

    //   let customersState = getState().customers;
    const rootState = getState();
    let customersState = rootState.customers;
    const user = rootState.user;

    dispatch(customerLoaderStart({
        url: customersState.currentUrl,
        key: customersState.currentKey
    }));

    customersState = getState().customers;

    const response = await fetch(customersState.currentUrl, {
        headers: {
            'x-access-token': user.token,
        }
    });

    try {
        const data = await response.json();

        if ('auth' in data) {
            dispatch(logout());
        } else {
            dispatch(customerLoaderSuccess({
                payload: data,
                url: customersState.currentUrl,
                pointer: customersState.pointer,
                key: customersState.currentKey,
                quantity: customersState.currentQuantity
            }))
        }
    } catch (e) {
        dispatch(clientSearchFailure({ error: { status: response.status, e } }));
        await waitForSeconds(2)
    }
}


