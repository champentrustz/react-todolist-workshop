import {all, call, takeEvery} from 'redux-saga/effects';
import {LOAD_USER_REQUEST, LOAD_USER_TASKS_REQUEST} from "../types/auth.type";
import {loadingUser, loadingUserTask} from "../actions/auth.action";

function* watchLoadUserAction(){
    yield takeEvery(LOAD_USER_REQUEST,loadingUser);
}

function* watchLoadUserTaskAction() {
    yield takeEvery(LOAD_USER_TASKS_REQUEST, loadingUserTask);
}


export default function* authSaga() {
    yield all([
        call(watchLoadUserAction),
        call(watchLoadUserTaskAction),
    ])
}