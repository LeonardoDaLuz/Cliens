import actionTypes from '../actionTypes'
import { UserState, UserAction } from '../types/user.types';

const initialState: UserState = {
    loginStatus : 'not logged'

}

const user = (state = initialState, action: UserAction) => {
    switch(action.type) {
        case actionTypes.LOGIN_START:
            break;
        case actionTypes.LOGIN_SUCCESS:
            break;
        case actionTypes.LOGIN_FAILURE:
            break;
    }

    return state;
}


export default user;