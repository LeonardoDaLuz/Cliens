import actionTypes from '../actionTypes'
import config from '../../config';
import { mergePathWithQueryAndQuery } from '../../utils/mergePathWithQueryAndQuery';
import { Dispatch, } from 'redux';
import { ApplicationState } from '..';
import { ClientsAction } from '../types/clients.types';
import { Action } from 'redux';


export const resetSearchCounter = (): Partial<ClientsAction> => {
    return { type: actionTypes.CLIENT_SEARCH_POINTER_RESET, key: '' }

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

