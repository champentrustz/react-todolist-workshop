import {ON_LOGIN, LOGIN_SUCCESS, LOGIN_FAILED} from "../types/login.type";


const initialState = {
    token: localStorage.getItem('token'),
    isLogin: false,
    userData: [],
};


export default (state = initialState, {type,payload}) => {
    switch (type) {
        case ON_LOGIN:
            return {...state, isLogin: true, userData: payload[0]};
        default:
            return state;
    }
}