import {takeEvery, all, call} from 'redux-saga/effects';
import {ON_REGISTER_REQUEST} from "../types/register.type";

function* watchRegisterAction() {
    yield takeEvery(ON_REGISTER_REQUEST,)
}

export default function* registerSaga() {
    yield all([
        call(watchRegisterAction),
    ])

}

