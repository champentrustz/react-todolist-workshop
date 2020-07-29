import {all, call, takeEvery} from 'redux-saga/effects';
import {
    ADD_PROJECT_REQUEST,
    OPEN_TASK_FORM_REQUEST,
    CANCEL_TASK_FORM_REQUEST,
    EDIT_PROJECT_REQUEST, DELETE_PROJECT_REQUEST, ADD_TASK_REQUEST
} from "../types/todo.type";
import {addProject, addTask, cancelTaskForm, deleteProject, editProject, openTaskForm} from "../actions/todo.action";

function* watchAddProjectRequest() {
    yield takeEvery(ADD_PROJECT_REQUEST,addProject);
}

function* watchAddTaskRequest() {
    yield takeEvery(ADD_TASK_REQUEST,addTask);
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

function* watchDeleteProjectRequest() {
    yield takeEvery(DELETE_PROJECT_REQUEST, deleteProject);
}

export function* todoSaga() {
    yield all([
        call(watchOpenTaskFormRequest),
        call(watchCancelTaskFormRequest),
        call(watchAddProjectRequest),
        call(watchEditProjectRequest),
        call(watchDeleteProjectRequest),
        call(watchAddTaskRequest),
    ])
}