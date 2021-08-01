
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch, AppThunk, RootState } from '.';
import config from '../config';
import { waitForSeconds } from '../utils/waitForSeconds';
import { FormularyType } from '../components/EditarCliente';

export type CustomerState = {
    readonly status: 'idle' | 'loading' | 'loaded' | 'loading_failed' | 'updating' | 'updated' | 'update_failed',
    readonly customer?: Customer,
    readonly id: number
    readonly error?: string,
    readonly url?: string,

}

type Mutable<T> = {
    -readonly [P in keyof T]: T[P]
};

export interface CustomerAction {
    id?: number,
    error?: string,
    customer?: Customer,
    url?: string
}

export interface Customer {
    id: number,
    nome: string,
    cpf: string,
    email: string,
    endereco: {
        cep: number,
        rua: string,
        numero: number,
        cidade: string,
        bairro: string
    }
}

export type ClientsRequestResponse = Customer[]; //Como estamos usando json server não há um padrao esquematizado de resposta.

const initialState: CustomerState = {
    status: 'idle',
    customer: null,
    id: -1
}

const customersSlice = createSlice({
    name: 'customers',
    initialState,
    reducers: {
        loadCustomerStart: (state: Mutable<CustomerState>, action: PayloadAction<CustomerAction>) => {
            state.status = 'loading';
            state.id = action.payload.id;
        },
        loadCustomerSucess: (state: Mutable<CustomerState>, action: PayloadAction<CustomerAction>) => {
            state.status = 'loaded';
            state.id = action.payload.id;
            state.customer = action.payload.customer;
        },
        loadCustomerFailure: (state: Mutable<CustomerState>, action: PayloadAction<CustomerAction>) => {
            state.status = 'loading_failed';
            state.id = action.payload.id;

        },
        updateCustomerStart: (state: Mutable<CustomerState>, action: PayloadAction<CustomerAction>) => {
            state.status = 'updating';
            state.id = action.payload.id;
        },
        updateCustomerSuccess: (state: Mutable<CustomerState>, action: PayloadAction<CustomerAction>) => {
            state.status = 'updated';
            state.id = action.payload.id;
            state.customer = action.payload.customer;
        },
        updateCustomerFailure: (state: Mutable<CustomerState>, action: PayloadAction<CustomerAction>) => {
            state.status = 'update_failed';
            state.id = action.payload.id;
        },

    }
})

export default customersSlice.reducer;

export const {
    loadCustomerStart,
    loadCustomerSucess,
    loadCustomerFailure,
    updateCustomerStart,
    updateCustomerSuccess,
    updateCustomerFailure
} = customersSlice.actions;

export function loadCustomer(id: string): AppThunk {
    return async (dispatch: AppDispatch, getState: () => RootState) => {

        const url = config.apiUrl + '/clientes/' + id;

        dispatch(loadCustomerStart({ id, url }));

        const response = await fetch(url, { method: 'GET' });

        if (response.status === 200) {
            try {
                const data = await response.json();

                if (data.id) {
                    dispatch(loadCustomerSucess({ id, customer: data, url }));

                } else {
                    dispatch(loadCustomerFailure({ id, error: 'strange answer ', url }));
                }

            } catch (e) {
                dispatch(loadCustomerFailure({ id, error: "Failed to parse answer :" + e, url }));
            }
        } else {
            dispatch(loadCustomerFailure({ id, error: response.status , url }))
        }
    }
}

export function updateCustomer(id: number, values: FormularyType): AppThunk {
    return async (dispatch: AppDispatch, getState: () => RootState) => {

        dispatch(updateCustomerStart({ id }));

        const url = config.apiUrl + '/clientes/' + (id!==-1?id:'');

        const body = {
            nome: values.name,
            cpf: values.cpf,
            email: values.email,
            endereco: {
                cep: values.cep,
                rua: values.street,
                numero: values.number,
                cidade: values.city,
                bairro: values.district
            },
        }


        const response = await fetch(url, {
            method: id===-1?'POST':'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': config.appUrl,

            },
            body: JSON.stringify(body)
        });

        if (response.status === 200 || response.status === 201) {
            try {
                const data = await response.json();

                if (data.id) {
                    dispatch(updateCustomerSuccess({ id, customer: data , url }));

                } else {
                    dispatch(updateCustomerFailure({ id, error: 'Invalid response, has not been updated ' , url }));
                }

            } catch (e) {
                dispatch(updateCustomerFailure({ id, error: "Failed to parse answer :" + e , url }));
            }
        } else {
            dispatch(updateCustomerFailure({ id, error: response.status , url }))
        }
    }
}