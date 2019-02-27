import {combineReducers} from 'redux'
import goodsReducer, {moduleName as goodsModule} from './ducks/goods'

export default combineReducers({
    [goodsModule]: goodsReducer
})