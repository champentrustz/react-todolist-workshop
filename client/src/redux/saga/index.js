import loginSaga from './login.saga';
import { all, call } from 'redux-saga/effects';
import registerSaga from "./register.saga";
import authSaga from "./auth.saga";

export default function* rootSaga() {
    yield all([
        call(loginSaga),
        call(registerSaga),
        call(authSaga),
        ])
}
