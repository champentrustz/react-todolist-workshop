import {put} from 'redux-saga/effects';
import {REGISTER_ERROR, REGISTER_SUCCESS} from "../types/register.type";

const axios = require('axios');


export function* RegisterAction({payload}) {


    const {name} = payload;
    const {username} = payload;
    const {password} = payload;
    const url = 'http://localhost:5000/api/register';

    try{
          const response = yield axios.post(url,{
            name : name,
            username : username,
            password : password
        });

          yield localStorage.setItem('token', response.data.token);


        yield put({
            type: REGISTER_SUCCESS,
            payload:  response.data
        });
    }catch (e) {
        console.log(e);
        yield put({
            type: REGISTER_ERROR
        })
    }

}
