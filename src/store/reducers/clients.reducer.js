import {
    CLIENT_SEARCH_START,
    CLIENT_SEARCH_SUCCESS,
    CLIENT_SEARCH_FAILURE
} from '../types'
import produce from 'immer';

const initialState = {
    status: 'idle',
    pointer: 0,
    lastPath: '',
    data: {}

}

const clients = produce((draft, action) => {
    switch (action.type) {
        case CLIENT_SEARCH_START:
            draft.status = 'loading';
            break; 
        case CLIENT_SEARCH_SUCCESS:
            draft.status = 'loaded';
            if (draft.data[action.key])
                draft.data[action.key].splice(action.pointer, action.payload.length, ...action.payload);
            else
                draft.data[action.key] = action.payload;

            draft.pointer = action.pointer + action.payload.length;
            break;
        case CLIENT_SEARCH_FAILURE:
            draft.status = 'fail';
            break;
    }
}, initialState);

export default clients;