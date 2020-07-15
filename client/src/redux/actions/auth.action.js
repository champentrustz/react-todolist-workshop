import {put} from 'redux-saga/effects';
import {LOAD_USER_ERROR, LOAD_USER_SUCCESS, LOADING_USER} from "../types/auth.type";

const axios = require('axios');


export function* loadingUser() {

    const token = yield localStorage.getItem('token');
    const url = 'http://localhost:5000/api/user';

    if(token) {
        try {
            const response = yield axios.get(url, {
                headers: {
                    'x-auth-token': token
                },
            })

            yield put({
                type : LOAD_USER_SUCCESS,
                payload : response.data
            })

        }catch (e) {
            console.log(e);
            yield put({
                type : LOAD_USER_ERROR,
            })
        }
    }


}