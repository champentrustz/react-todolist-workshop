import {takeEvery, all, call} from 'redux-saga/effects';
import { REGISTER_REQUEST} from "../types/register.type";
import {RegisterAction} from "../actions/register.action";

function* watchRegisterAction() {
    yield takeEvery(REGISTER_REQUEST,RegisterAction);
}

export default function* registerSaga() {
    yield all([
        call(watchRegisterAction),
    ])

}

