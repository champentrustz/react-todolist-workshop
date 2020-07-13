import {put} from 'redux-saga/effects'
import {ON_LOGIN,} from "../types/login.type";
import { call } from 'redux-saga/effects';

const axios = require('axios');


export function* LoginAction() {
    //yield delay(2000); set delay
    const url = 'http://localhost:5000/api/users';
    const response = yield axios.get(url);
    const data = yield response.data.data

    yield put({
        type: ON_LOGIN,
        payload : data,
    });
}




