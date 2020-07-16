import {put} from 'redux-saga/effects'
import {CANCELED_TASK_FORM, OPEN_TASK_FORM} from "../types/todo.type";

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