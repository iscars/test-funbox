import React, { Component } from 'react'
import CardList from './CardList'

class Root extends Component {
    render() {
        return (
            <main className="container">
                <div className="title">Ты сегодня покормил кота?</div>
                <CardList/>
            </main>
        )
    }
}

export default Root
