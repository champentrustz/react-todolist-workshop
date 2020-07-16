import {all, call, takeEvery} from 'redux-saga/effects';
import {ADD_TASK_FORM_REQUEST, CANCEL_TASK_FORM_REQUEST} from "../types/todo.type";
import {cancelTaskForm, openTaskForm} from "../actions/todo.action";

function* watchAddTaskRequest() {
    yield takeEvery(ADD_TASK_FORM_REQUEST,openTaskForm);
}

function* watchCancelTaskRequest() {
    yield takeEvery(CANCEL_TASK_FORM_REQUEST, cancelTaskForm)
}

export function* todoSaga() {
    yield all([
        call(watchAddTaskRequest),
        call(watchCancelTaskRequest),
    ])
}