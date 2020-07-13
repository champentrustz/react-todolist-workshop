import {ON_LOGIN_REQUEST} from "../types/login.type";
import {setLoginAction} from "../actions/login.action";
import {takeEvery, all, call } from 'redux-saga/effects';

function* watchLoginAction() {
    yield takeEvery(ON_LOGIN_REQUEST, setLoginAction);
}


export default function* loginSaga(){
    yield all([
        call(watchLoginAction),
    ])
}
