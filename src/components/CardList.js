import React, { Component } from 'react'
import {connect} from 'react-redux'
import {moduleName, fetchGoods, eventListSelector, selectEvent} from '../redux/ducks/goods'
import Card from './Card'

class Root extends Component {
    componentDidMount() {
        this.props.fetchGoods()
    }

    componentDidUpdate() {
        console.log(this.props.selected.toJS())
    }

    render() {
        if (this.props.loading) return <div>Loading goods list...</div>
        if (this.props.error) return <div>Failed to load data</div>
        const goodList = this.getGoods(this.props.goods)

        return (
            <ul className="grid">
                {goodList}
            </ul>
        )
    }

    getGoods = goods => (
        goods.map(event => (
            <li key={event.id} className="grid__item">
                <Card event={event} selectEvent={this.selectEvent}/>
            </li>
        ))
    )

    selectEvent = id => {
        this.props.selectEvent(id)
    }
}

export default connect(state => ({
    goods: eventListSelector(state),
    loading: state[moduleName].loading,
    error: state[moduleName].error,
    selected: state[moduleName].selected
}), {fetchGoods, selectEvent})(Root)
