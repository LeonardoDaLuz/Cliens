import {
    CLIENT_SEARCH_START,
    CLIENT_SEARCH_SUCCESS,
    CLIENT_SEARCH_FAILURE,
    CLIENT_SEARCH_POINTER_RESET
} from '../types';
import config from '../../config';

export const resetSearchCounter = () => {
    return (dispatch) => {
        dispatch({ type: CLIENT_SEARCH_POINTER_RESET })
    }
}

export const loadMoreClients = (path, query = '', quantity = 12) => {
    return async (dispatch, getState) => {

        let pointer = getState().clients.pointer;
        query = query.replace('?', ''); //caso receba interrogação, remover, para normalizar essa query caso veja com interrogação.
        path = path.replace('?', ''); //caso receba interrogação, remover, para normalizar essa query caso veja com interrogação.


        const url = config.apiUrl + path + '?' + query + '&_start=' + pointer + '&_limit=' + quantity;

        dispatch({ type: CLIENT_SEARCH_START, url });

        await fetch(url)
            .then(body => body.json())
            .then(data => dispatch({ type: CLIENT_SEARCH_SUCCESS, payload: data, pointer, key: path + '?' + query }))
            .catch(error => dispatch({ type: CLIENT_SEARCH_FAILURE, error }))


    }
}