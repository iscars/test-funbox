import {OrderedSet, Map} from 'immutable'

export function dataToEntities(data, RecordModel = Map) {
    const immutableData = new OrderedSet(data).map(
        value => new RecordModel(value)
    )
    return immutableData
}