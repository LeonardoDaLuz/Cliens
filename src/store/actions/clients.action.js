import actionTypes from '../types'

import config from '../../config';
import { mergePathWithQueryAndQuery } from '../../utils/mergePathWithQueryAndQuery';

export const resetSearchCounter = () => {
    return (dispatch) => {
        dispatch({ type: actionTypes.CLIENT_SEARCH_POINTER_RESET })
    }
}

export const loadMoreClients = (path, query = '', quantity = 12) => {
    return async (dispatch, getState) => {

        let clients = getState().clients;        

        let pointer = clients.pointer;        

        let pathWithQuery = mergePathWithQueryAndQuery(path, query);

        if(pathWithQuery!==clients.lastKey)
            pointer = 0;

        const url = config.apiUrl + mergePathWithQueryAndQuery(pathWithQuery, '&_start=' + pointer + '&_limit=' + quantity);

        dispatch({ type: actionTypes.CLIENT_SEARCH_START, url });

        await fetch(url)
            .then(body => body.json())
            .then(data => dispatch({ type: actionTypes.CLIENT_SEARCH_SUCCESS, payload: data, url, pointer, key: pathWithQuery, quantity }))
            .catch(error => dispatch({ type: actionTypes.CLIENT_SEARCH_FAILURE, error }))


    }
}

