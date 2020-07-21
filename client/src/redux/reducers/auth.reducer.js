import { LOGIN_SUCCESS, LOGIN_ERROR} from "../types/login.type";
import { REGISTER_ERROR, REGISTER_SUCCESS} from "../types/register.type";
import {LOAD_USER_ERROR, LOAD_USER_SUCCESS, LOAD_USER_TASKS_SUCCESS} from "../types/auth.type";
import {ADD_PROJECT_SUCCESS} from "../types/todo.type";


const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isRegistered : null,
    isLogin : null,
    userData: null,
    userTask: null,
};




export default (state = initialState, {type,payload}) => {


    switch (type) {

        case REGISTER_SUCCESS :
            return {...state, isAuthenticated: true, isRegistered: true,userData: payload.user, token: payload.token};
        case REGISTER_ERROR :
            return {...state,isAuthenticated: false, isRegistered: false};
        case LOAD_USER_SUCCESS :
            return {...state, userData: payload.user, isAuthenticated: true};
        case LOAD_USER_ERROR :
            return {...state, isAuthenticated: false, isLogin: null};
        case LOGIN_SUCCESS:
            return {...state, isAuthenticated: true, isLogin: true, userData: payload.user, token: payload.token};
        case  LOGIN_ERROR:
            return {...state, isAuthenticated: false, isLogin: false};
        case LOAD_USER_TASKS_SUCCESS:
            return {...state, userTask: payload.user}
        case ADD_PROJECT_SUCCESS:
            return {...state, userTask: payload.user}
        default:
            return state;
    }
}