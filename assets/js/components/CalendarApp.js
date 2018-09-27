import React from 'react'
import PropTypes from 'prop-types'

import { createFragmentContainer } from 'react-relay'

import AppBar from './AppBar'
import Notifier from './Notifier'


class CalendarApp extends React.Component {

    render() {
        const { children } = this.props
        console.log("Props in CalendarApp:", this.props)
        return (
            <div>
                <AppBar />
                <Notifier />
                {children}
            </div>
        )
    }
}

CalendarApp.propTypes = {
    children: PropTypes.node.isRequired,
    // relay: PropTypes.object.isRequired,
}

export default createFragmentContainer(
    CalendarApp,
    graphql`
        fragment CalendarApp_taskList on TaskList {
            tasks {
                id
            }
        }
    `,
)

