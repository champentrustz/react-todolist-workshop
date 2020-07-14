import {LOGIN_REQUEST} from "../types/login.type";
import {LoginAction} from "../actions/login.action";
import {takeEvery, all, call } from 'redux-saga/effects';

function* watchLoginAction() {
    yield takeEvery(LOGIN_REQUEST, LoginAction);
}


export default function* loginSaga(){
    yield all([
        call(watchLoginAction),
    ])
}
