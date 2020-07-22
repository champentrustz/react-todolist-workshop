import {all, call, takeEvery} from 'redux-saga/effects';
import {
    ADD_PROJECT_REQUEST,
    OPEN_TASK_FORM_REQUEST,
    CANCEL_TASK_FORM_REQUEST,
    EDIT_PROJECT_REQUEST
} from "../types/todo.type";
import {addProject, cancelTaskForm, editProject, openTaskForm} from "../actions/todo.action";

function* watchAddProjectRequest() {
    yield takeEvery(ADD_PROJECT_REQUEST,addProject);
}

function* watchOpenTaskFormRequest() {
    yield takeEvery(OPEN_TASK_FORM_REQUEST,openTaskForm);
}

function* watchCancelTaskFormRequest() {
    yield takeEvery(CANCEL_TASK_FORM_REQUEST, cancelTaskForm);
}

function* watchEditProjectRequest() {
    yield takeEvery(EDIT_PROJECT_REQUEST, editProject);
}

export function* todoSaga() {
    yield all([
        call(watchOpenTaskFormRequest),
        call(watchCancelTaskFormRequest),
        call(watchAddProjectRequest),
        call(watchEditProjectRequest),
    ])
}