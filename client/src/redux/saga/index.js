import loginSaga from './login.saga';
import { all, call } from 'redux-saga/effects';

export default function* rootSaga() {
    yield all([
        call(loginSaga),
        ])
}
