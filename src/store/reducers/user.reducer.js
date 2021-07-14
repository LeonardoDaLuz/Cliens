import actionTypes from '../types'


const initialState = {
    loginStatus : 'not logged'

}

const user = (state = initialState, action) => {
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