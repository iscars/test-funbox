import React, {Component} from 'react'
import classNames from 'classnames'

class Card extends Component {
    state = {
        checked: false,
        checkedHover: false
    }

    render() {
        const {event} = this.props

        return (
            <div onMouseLeave={this.setCheckedHover} className="card">
                <input type="checkbox"
                       disabled={!event.availability}
                       checked={this.state.checked}
                       onChange={this.handleChange}
                       id={event.id}
                       className="card__input"
                />
                <label htmlFor={event.id}
                       className={classNames("card__label-content", !event.availability && "disabled")}
                >
                    <div className="card__panel">
                        <div className="card__panel-inner">
                            <div className="card__panel-inner-corner"/>
                        </div>
                    </div>
                    <div className="card__body">
                        <div className="offer">
                            <div className="offer__body card__offer-body">
                                <div className={classNames(
                                    "offer__segment", this.state.checkedHover && "card__checked-not-hover"
                                )}
                                >
                                    {event.segment}
                                </div>
                                {
                                    this.state.checkedHover
                                    && <div className="offer__tip card__checked-hover">Котэ не одобряет?</div>
                                }
                                <div className="offer__name">{event.title}</div>
                                <div className="offer__description">{event.description}</div>
                                {this.getSpecs()}
                            </div>
                            <div className="offer__quantity card__quantity">
                                <span className="offer__quantity-lg">{event.weight[0]}</span>
                                <span className="offer__quantity-sm">{event.weight[1]}</span>
                            </div>
                        </div>
                    </div>
                </label>
                <div className="card__notes">
                    {
                        event.availability ? (
                            this.state.checked ? (
                                <span>
                                    {event.notes}
                                </span>

                            ) : (
                                <React.Fragment>
                                    <span>Чего сидишь? Порадуй котэ, </span>
                                    <label htmlFor={event.id} className="card__label-notes">купи.</label>
                                </React.Fragment>
                            )
                        ) : (
                            <span className="text-attention">Печалька, {event.description} закончился</span>
                        )
                    }
                </div>
            </div>
        )
    }

    getSpecs = () => (
        <ul className="offer__specs">
            {this.props.event.specs.map(this.getSpec)}
        </ul>
    )

    getSpec = (event, index) => (
        <li key={index}>
            {
                event.map ? (
                    <React.Fragment>
                        {event[0] !== 1 && <strong>{event[0]} </strong>}
                        {event[1]}
                    </React.Fragment>
                ) : event
            }
        </li>
    )

    handleChange = () => {
        this.setState({checked: !this.state.checked})
        this.state.checked && this.setState({checkedHover: false})
        this.props.selectEvent(this.props.event.id)
    }

    setCheckedHover = () => {
        this.state.checked && !this.state.checkedHover && this.setState({checkedHover: true})
    }
}

export default Card
