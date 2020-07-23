import {put} from 'redux-saga/effects'
import {
    ADD_PROJECT_SUCCESS,
    CANCELED_TASK_FORM,
    DELETE_PROJECT_SUCCESS,
    EDIT_PROJECT_SUCCESS,
    OPEN_TASK_FORM
} from "../types/todo.type";

const axios = require('axios');

export function* deleteProject({payload}) {

    const token = yield localStorage.getItem('token');
    const url = 'http://localhost:5000/api/delete-project';

    if (token) {
        try {
            const response = yield axios.post(url, {
                id: payload
            }, {
                headers: {
                    'x-auth-token': token,
                }
            });


            yield put({
                type: DELETE_PROJECT_SUCCESS,
                payload: response.data
            });

        } catch (e) {

        }
    }
}

export function* editProject({payload}) {
    const token = yield localStorage.getItem('token');
    const url = 'http://localhost:5000/api/edit-project';

    if (token) {
        try {
            const response = yield axios.post(url, {
                name: payload.project,
                id: payload.id
            }, {
                headers: {
                    'x-auth-token': token,
                }
            });


            yield put({
                type: EDIT_PROJECT_SUCCESS,
                payload: response.data
            });

        } catch (e) {

        }

    }
}

export function* addProject({payload}) {

    const token = yield localStorage.getItem('token');
    const url = 'http://localhost:5000/api/add-project';

    if (token) {
        try {
            const response = yield axios.post(url, {
                name: payload.project,
                type: 'PROJECT'
            }, {
                headers: {
                    'x-auth-token': token,
                }
            });


            yield put({
                type: ADD_PROJECT_SUCCESS,
                payload: response.data
            });

        } catch (e) {

        }
    } else {
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