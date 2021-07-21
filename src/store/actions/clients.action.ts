import actionTypes from '../actionTypes'
import config from '../../config';
import { mergePathWithQueryAndQuery } from '../../utils/mergePathWithQueryAndQuery';
import { Dispatch, } from 'redux';
import { ApplicationState } from '..';
import { ClientsAction } from '../types/clients.types';
import { Action } from 'redux';
import { waitForSeconds } from '../../utils/waitForSeconds';

export const resetSearchCounter = (): Partial<ClientsAction> => {
    return { type: actionTypes.CLIENT_SEARCH_POINTER_RESET, key: '' }

}

export const infiniteClientLoaderStart = (path = '', query = '', quantity = 12) => {
    return async (dispatch: Dispatch, getState: () => ApplicationState) => {

        dispatch({ type: actionTypes.INFINITE_CLIENT_LOADER_START })
        await waitForSeconds(0.1);

        let clientsState = getState().clients;


        while (clientsState.holdInfiniteLoader) {
            await waitForSeconds(0.1);
            if (window.pageYOffset > document.body.clientHeight - window.innerHeight - 4000) {
               loadMoreClients(path, query, 30)(dispatch, getState);

            } else {
                await waitForSeconds(0.1);
            }
        }



        dispatch({ type: actionTypes.INFINITE_CLIENT_LOADER_STOP })
    }
}

export const infiniteClientLoaderStop = (): Partial<ClientsAction> => {
    return { type: actionTypes.INFINITE_CLIENT_LOADER_STOP }

}

export const loadMoreClients = (path = '', query = '', quantity = 12) => {
    return async (dispatch: Dispatch, getState: () => ApplicationState) => {

        let clientsState = getState().clients;

        let pointer = clientsState.pointer;

        let pathWithQuery = mergePathWithQueryAndQuery(path, query);

        if (pathWithQuery !== clientsState.lastKey)
            pointer = 0;

        const url = config.apiUrl + mergePathWithQueryAndQuery(pathWithQuery, '&_start=' + pointer + '&_limit=' + quantity);

        dispatch<Partial<ClientsAction> & Action>({ type: actionTypes.CLIENT_SEARCH_START, url, key: pathWithQuery });

        await fetch(url)
            .then(body => body.json())
            .then(data => {
                dispatch<ClientsAction>({ type: actionTypes.CLIENT_SEARCH_SUCCESS, payload: data, url, pointer, key: pathWithQuery, quantity })
            })
            .catch(error => {
                dispatch<Partial<ClientsAction> & Action>({ type: actionTypes.CLIENT_SEARCH_FAILURE, error })
            })

    }
}

function runThunk() {
    
}

