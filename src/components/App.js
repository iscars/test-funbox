import React, {Component} from 'react'
import store from '../redux/'
import {Provider} from 'react-redux'
import Root from './Root'

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Root/>
            </Provider>
        )
    }
}

export default App
