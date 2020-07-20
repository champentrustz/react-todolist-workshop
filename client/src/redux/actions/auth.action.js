import {put} from 'redux-saga/effects';
import {
    LOAD_USER_ERROR,
    LOAD_USER_SUCCESS, LOAD_USER_TASKS_ERROR,
    LOAD_USER_TASKS_SUCCESS,
} from "../types/auth.type";

const axios = require('axios');

export function* loadingUserTask() {

    const token = yield localStorage.getItem('token');
    const url = 'http://localhost:5000/api/get-user-details';

    if(token) {
        try {
            const response = yield axios.get(url, {
                headers: {
                    'x-auth-token': token
                },
            })

            yield put({
                type : LOAD_USER_TASKS_SUCCESS,
                payload : response.data
            })

        }catch (e) {
            yield put({
                type : LOAD_USER_TASKS_ERROR,
            })
        }
    }

}

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
            yield put({
                type : LOAD_USER_ERROR,
            })
        }
    }


}