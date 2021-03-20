import {put} from 'redux-saga/effects'
import {
    ADD_PROJECT_SUCCESS,
    CANCELED_TASK_FORM,
    DELETE_PROJECT_SUCCESS, DELETE_TASK_SUCCESS,
    EDIT_PROJECT_SUCCESS, EDIT_TASK_SUCCESS, OPEN_EDIT_TASK_FORM,
    OPEN_TASK_FORM
} from "../types/todo.type";

const axios = require('axios');


export function* addTask({payload}) {


    const token = yield localStorage.getItem('token');
    const url = 'http://localhost:5000/api/task/add-task';

    if (token) {
        try {
            const response = yield axios.post(url, {
                id: payload.id,
                task : payload.task,
                date : payload.date,
                time : payload.time
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
    }
}

export function* deleteProject({payload}) {

    const token = yield localStorage.getItem('token');
    const url = 'http://localhost:5000/api/task/delete-project';

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
    const url = 'http://localhost:5000/api/project/edit-project';

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

export function* editTask({payload}) {

    const token = yield localStorage.getItem('token');
    const url = 'http://localhost:5000/api/task/edit-task';


    if (token) {
        try {
            const response = yield axios.post(url, {
                task: payload.task,
                projectID : payload.projectID,
                taskID: payload.taskID,
                time: payload.time,
                date : payload.date
            }, {
                headers: {
                    'x-auth-token': token,
                }
            });


            yield put({
                type: EDIT_TASK_SUCCESS,
                payload: response.data
            });

        } catch (e) {

        }

    }
}

export function* deleteTask({payload}) {
    const token = yield localStorage.getItem('token');
    const url = 'http://localhost:5000/api/task/delete-task';


    if (token) {
        try {
            const response = yield axios.post(url, {
                taskID: payload
            }, {
                headers: {
                    'x-auth-token': token,
                }
            });


            yield put({
                type: DELETE_TASK_SUCCESS,
                payload: response.data
            });

        } catch (e) {

        }
    }
}

export function* addProject({payload}) {


    const token = yield localStorage.getItem('token');
    const url = 'http://localhost:5000/api/task/add-project';

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

export function* openEditTaskForm({payload}) {

    yield put({
        type: OPEN_EDIT_TASK_FORM,
        payload : payload
    });
}

export function* cancelTaskForm() {
    yield put({
        type: CANCELED_TASK_FORM
    });
}