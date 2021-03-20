import {put} from 'redux-saga/effects'
import {LOGIN_ERROR, LOGIN_SUCCESS} from "../types/login.type";


const axios = require('axios');


export function* LoginAction({payload}) {

    const {username} = payload;
    const {password} = payload

    const url = 'http://localhost:5000/api/user/login';

    try {
        const response = yield axios.post(url, {
            username: username,
            password: password
        });

        yield localStorage.setItem('token',response.data.token);

        yield put({
            type: LOGIN_SUCCESS,
            payload: response.data
        });
    }catch (e) {
        yield put({
            type: LOGIN_ERROR,
        });
    }
}




