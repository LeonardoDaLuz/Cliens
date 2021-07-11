import {
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_FAILURE
} from '../types'


const initialState = {
    loginStatus : 'not logged'

}

const user = (state = initialState, action) => {
    switch(action.type) {
        case LOGIN_START:
            break;
        case LOGIN_SUCCESS:
            break;
        case LOGIN_FAILURE:
            break;
    }

    return state;
}

export default user;