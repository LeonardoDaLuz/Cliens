import actionTypes from '../types'
import produce from 'immer';

const initialState = {
    status: 'idle',
    pointer: 0,
    lastKey: '',
    data: {},
    searchCompleted: false,
}

const clients = produce((draft, action) => {
    switch (action.type) {
        case actionTypes.CLIENT_SEARCH_START:
            draft.status = 'loading';
            break;
        case actionTypes.CLIENT_SEARCH_SUCCESS:
            draft.status = 'loaded';

            if (draft.data[action.key])
                draft.data[action.key].splice(action.pointer, action.payload.length, ...action.payload);
            else
                draft.data[action.key] = action.payload;

            if (action.payload.length < action.quantity)
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