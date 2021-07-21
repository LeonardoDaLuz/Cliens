import actionTypes from '../actionTypes'
import produce from 'immer';
import { Action } from 'redux';
import { ClientsState, ClientsAction, Client } from '../types/clients.types';

const initialState: ClientsState = {
    status: 'idle',
    pointer: 0,
    lastKey: '',
    data: {},
    searchCompleted: false,
    holdInfiniteLoader: false,
}

const clients = produce((draft, action: ClientsAction) => {
    switch (action.type) {
        case actionTypes.INFINITE_CLIENT_LOADER_START:
            draft.holdInfiniteLoader = true;
            draft.searchCompleted = false;
            break;
        case actionTypes.INFINITE_CLIENT_LOADER_STOP:
            draft.holdInfiniteLoader = false;
            break;
        case actionTypes.CLIENT_SEARCH_START:
            draft.status = 'loading';
            draft.lastKey = action.key;
            draft.searchCompleted = false;
            break;
        case actionTypes.CLIENT_SEARCH_SUCCESS:

            draft.status = 'loaded';

            if (draft.data[action.key])
                draft.data[action.key].splice(action.pointer, action.payload!.length, ...action.payload!);
            else
                draft.data[action.key] = action.payload;


            if (draft.lastKey === action.key && action.payload.length < action.quantity)
                draft.searchCompleted = true;
            else
                draft.searchCompleted = false;

            draft.lastKey = action.key;

            draft.pointer = action.pointer + action.payload.length;

            break;
        case actionTypes.CLIENT_SEARCH_FAILURE:
            draft.status = 'fail';
            break;
        case actionTypes.CLIENT_SEARCH_POINTER_RESET:
            draft.searchCompleted = false;
            break;
    }
}, initialState);



export default clients;