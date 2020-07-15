import {all, call, takeEvery} from 'redux-saga/effects';
import {LOAD_USER_REQUEST} from "../types/auth.type";
import {loadingUser} from "../actions/auth.action";

function* watchLoadUserAction(){
    yield takeEvery(LOAD_USER_REQUEST,loadingUser)
}


export default function* authSaga() {
    yield all([
        call(watchLoadUserAction),
    ])
}