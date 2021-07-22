import actionTypes from '../actionTypes'
import produce from 'immer';
import { Action } from 'redux';
import { ClientsState, ClientsAction, Client } from '../types/clients.types';
import { mergePathWithQueryAndQuery } from '../../utils/mergePathWithQueryAndQuery';
import config from '../../config';

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
}

const clients = produce((draft, action: ClientsAction) => {
    switch (action.type) {
        case actionTypes.INFINITE_CLIENT_LOADER_START:
        case actionTypes.SET_CLIENT_LOAD_PATH_AND_QUERY:
            draft.holdInfiniteLoader = true;
            draft.loadCompleted = false;
            draft.currentPath = action.path!;
            draft.currentQuery = action.query!;
            draft.pointer = 0;
            draft.currentQuantity = action.quantity ? action.quantity : draft.currentQuantity;
            draft.currentKey = mergePathWithQueryAndQuery(action.path!, action.query!);
            draft.currentUrl = config.apiUrl + mergePathWithQueryAndQuery(draft.currentKey!, '&_start=' + draft.pointer + '&_limit=' + draft.currentQuantity);

            break;
        case actionTypes.INFINITE_CLIENT_LOADER_STOP:
            draft.holdInfiniteLoader = false;
            break;
        case actionTypes.CLIENT_SEARCH_START:
            draft.status = 'loading';
            draft.lastKey = action.key;
            draft.currentUrl = config.apiUrl + mergePathWithQueryAndQuery(draft.currentKey!, '&_start=' + draft.pointer + '&_limit=' + draft.currentQuantity);
            break;
        case actionTypes.CLIENT_SEARCH_SUCCESS:

            draft.status = 'loaded';

            if (draft.data[action.key])
                draft.data[action.key].splice(action.pointer, action.payload!.length, ...action.payload!);
            else
                draft.data[action.key] = action.payload;


            if (draft.lastKey === action.key && action.payload.length < action.quantity)
                draft.loadCompleted = true;
            else
                draft.loadCompleted = false;

            draft.lastKey = action.key;

            draft.pointer = action.pointer + action.payload.length;

            break;
        case actionTypes.CLIENT_SEARCH_FAILURE:
            draft.status = 'fail';
            break;
        case actionTypes.CLIENT_LOAD_POINTER_RESET:
            draft.loadCompleted = false;
            break;
    }
}, initialState);



export default clients;