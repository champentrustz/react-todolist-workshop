import {put} from 'redux-saga/effects'
import {ADD_PROJECT_SUCCESS, CANCELED_TASK_FORM, OPEN_TASK_FORM} from "../types/todo.type";

const axios = require('axios');

export function* addProject({payload}) {

    const token = yield localStorage.getItem('token');
    const url = 'http://localhost:5000/api/add-project';

    if(token){
        try{
            const response = yield axios.post(url, {
                    name : payload.project,
                    type : 'PROJECT'
            },{
                headers: {
                    'x-auth-token': token,
                }});


            yield put({
                type: ADD_PROJECT_SUCCESS,
                payload:  response.data
            });

        }catch (e) {

        }
    }else {
        console.log('No token')
    }
}

export function* openTaskForm() {
    yield put({
        type: OPEN_TASK_FORM
    });
}

export function* cancelTaskForm() {
    yield put({
        type: CANCELED_TASK_FORM
    });
}