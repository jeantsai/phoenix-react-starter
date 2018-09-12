import React, { Component } from 'react'
import { QueryRenderer, graphql } from 'react-relay'
import environment from '../../environment'
import MyCalendar from './my-calendar'


const CalendarPageQuery = graphql`
    query CalendarPageQuery {
        allTasks {
            id
            title
            description
            start
            end
            aborted
            progress
        }
    }
`

class CalendarPage extends Component {
    render() {
        console.log("Rendering CalendarPage ...")
        return (
            <QueryRenderer
                environment = {environment}
                query = {CalendarPageQuery}
                render = {({error, props}) => {
                    console.log("Props from QueryRenderer: ", props)
                    if (error) {
                        return <div>{error.message}</div>
                    } else if (props) {
                        return <MyCalendar events={props.allTasks}/>
                    }
                    return <div>Loading</div>
                }}
            />
        )
    }
}

export default CalendarPage
