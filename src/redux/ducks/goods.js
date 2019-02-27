import {all, put, takeEvery} from 'redux-saga/effects'
import {Record, OrderedSet} from 'immutable'
import {createSelector} from 'reselect'
import {goodsDB} from '../../fake-db/goods'
import {dataToEntities} from './utils'


export const moduleName = 'goods'
const prefix = moduleName
export const FETCH_REQUEST = `${prefix}/FETCH_REQUEST`
export const FETCH_SUCCESS = `${prefix}/FETCH_SUCCESS`
export const SELECT_EVENT = `${prefix}/SELECT_EVENT`


export const ReducerRecord = Record({
    goods: new OrderedSet([]),
    selected: new OrderedSet([]),
    loading: false
})

export const EventRecord = Record({
    id: null,
    segment: null,
    title: null,
    description: null,
    specs: null,
    weight: null,
    notes: null,
    availability: null
})


export default function reducer(state = new ReducerRecord(), action) {
    const {type, payload} = action

    switch (type) {
        case FETCH_REQUEST:
            return state.set('loading', true)

        case FETCH_SUCCESS:
            return state
                .set('loading', false)
                .set('goods', dataToEntities(payload, EventRecord))

        case SELECT_EVENT:
            return state.selected.contains(payload.id)
                ? state.update('selected', selected => selected.remove(payload.id))
                : state.update('selected', selected => selected.add(payload.id))

        default:
            return state
    }
}


export const stateSelector = state => state[moduleName]
export const entitiesSelector = createSelector(stateSelector, state => state.goods)
export const eventListSelector = createSelector(entitiesSelector, entities => entities.toJS())


export function fetchGoods() {
    return {
        type: FETCH_REQUEST
    }
}

export const fetchGoodsSaga = function * () {
    const data = goodsDB
    yield put({
        type: FETCH_SUCCESS,
        payload: data
    })
}

export function selectEvent(id) {
    return {
        type: SELECT_EVENT,
        payload: {id}
    }
}

export const saga = function * () {
    yield all([
        yield takeEvery(FETCH_REQUEST, fetchGoodsSaga)
    ])
}