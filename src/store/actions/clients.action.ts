import actionTypes from '../actionTypes'
import config from '../../config';
import { mergePathWithQueryAndQuery } from '../../utils/mergePathWithQueryAndQuery';
import { Dispatch, } from 'redux';
import { ApplicationState } from '..';
import { ClientsAction } from '../types/clients.types';
import { Action } from 'redux';
import { waitForSeconds } from '../../utils/waitForSeconds';

export const resetLoadPointer = (): Partial<ClientsAction> => {
    return { type: actionTypes.CLIENT_LOAD_POINTER_RESET, key: '' }

}

export const setClientLoadPathAndQuery = (path: string, query: string): Partial<ClientsAction> => {
    return { type: actionTypes.SET_CLIENT_LOAD_PATH_AND_QUERY, path, query }
}

export const infiniteClientLoaderStart = (path = '', query = '', quantity = 30) => {
    return async (dispatch: Dispatch, getState: () => ApplicationState) => {

        dispatch({ type: actionTypes.INFINITE_CLIENT_LOADER_START, path, query, quantity });

        await waitForSeconds(0.1);

        let clientsState = getState().clients;

        while (clientsState.holdInfiniteLoader) {

            if (clientsState.reloadTrigger || (!clientsState.loadCompleted && window.pageYOffset > document.body.clientHeight - window.innerHeight - 1000)) {
                await loadMoreClients(clientsState.currentPath, clientsState.currentQuery, 30)(dispatch, getState);
            } else {
                await waitForSeconds(0.1);
            }
            clientsState = getState().clients;
        }

        dispatch({ type: actionTypes.INFINITE_CLIENT_LOADER_WAS_STOPED })
    }
}

export const infiniteClientLoaderStop = (): Partial<ClientsAction> => {
    return { type: actionTypes.INFINITE_CLIENT_LOADER_STOP }

}

export const loadMoreClients = (path = '', query = '', quantity = 12) => {
    return async (dispatch: Dispatch, getState: () => ApplicationState) => {

        let clientsState = getState().clients;

        dispatch<Partial<ClientsAction> & Action>({
            type: actionTypes.CLIENT_SEARCH_START,
            url: clientsState.currentUrl,
            key: clientsState.currentKey
        });

        clientsState = getState().clients;

        await fetch(clientsState.currentUrl)
            .then(body => body.json())
            .then(data => {
                dispatch<ClientsAction>({
                    type: actionTypes.CLIENT_SEARCH_SUCCESS,
                    payload: data, url: clientsState.currentUrl,
                    pointer: clientsState.pointer,
                    key: clientsState.currentKey,
                    quantity: clientsState.currentQuantity
                })
            })
            .catch(error => {
                dispatch<Partial<ClientsAction> & Action>({ type: actionTypes.CLIENT_SEARCH_FAILURE, error })
            })

    }
}
