import {saga as goodsSaga} from './ducks/goods'
import {all} from 'redux-saga/effects'

export  default function * rootSaga() {
    yield all([
        goodsSaga()
    ])
}