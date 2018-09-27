import React from "react"
import BigCalendar from "react-big-calendar"
import moment from "moment"
// import "react-dnd"
// import html5Backend from "react-dnd-html5-backend"
// import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop"
import { createFragmentContainer } from 'react-relay'

import "react-big-calendar/lib/addons/dragAndDrop/styles.css"
import "react-big-calendar/lib/css/react-big-calendar.css"
import events from './events'
import TaskForm from './TaskForm'

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

// const DnDCalendar = withDragAndDrop(Calendar, html5Backend);

const colorizeEvent = (event) => {
  
}

// const Event = ({event, title}) => (
//   <span style={{backgroundColor: 'red'}}>{title}</span>
// )

// const EventWrapper = ({style, children, ...props}) => (
//   <div 
//     {...props}
//     style={{backgroundColor: "red", ...style}}
//     >
//     {children}
//   </div>
// )

const eventPropGetter = (event, start, end, isSelected) => {
  let colorClassName = 'ac-event-unknown'
  let diff = moment().diff(end, "days")
  // console.log(diff)
  if (event.completionRate == 100) {
    colorClassName = 'ac-event-completed'
  } else if (event.aborted) {
    colorClassName = 'ac-event-aborted'
  } else if (diff < 0) {
    colorClassName = 'ac-event-on-schedule'
  } else if (diff == 0) {
    colorClassName = 'ac-event-behind-schedule'
  } else {
    colorClassName = 'ac-event-overdue'
  }
  return {
    className: colorClassName
  }
}

class CalendarView extends React.Component {
  constructor(props) {
    super(props)
    console.log("Props: ", props)
    let events = props.taskList.tasks.map( ({start, end, ...properties}) => ({
      start: new Date(start),
      end: new Date(end),
      ...properties
    }))
    this.state = {events: events}
  }

  onEventResize = (type, { event, start, end, allDay }) => {
    this.setState(state => {
      state.events[0].start = start
      state.events[0].end = end
      return { events: state.events }
    })
  }

  onEventDrop = ({ event, start, end, allDay }) => {
    // console.log(start)
  }

  onSelectSlot = (slotInfo) => {
    console.log(slotInfo)
    
  }

  onDoubleClickEvent = (event, e) => {
    console.log(e)
  }

  render() {
    return (
      <div>
        <BigCalendar
          defaultDate={new Date()}
          defaultView="month"
          events={this.state.events}
          onEventDrop={this.onEventDrop}
          onEventResize={this.onEventResize}
          onSelectSlot={this.onSelectSlot}
          onDoubleClickEvent={this.onDoubleClickEvent}
          selectable={true}
          resizable
          style={{ height: "100vh" }}
          eventPropGetter={eventPropGetter}
        />
      </div>
    );
  }
}

export default createFragmentContainer(
  CalendarView,
  graphql`
      fragment CalendarView_taskList on TaskList {
        tasks {
          id
          title
          description
          start
          end
          aborted
          progress
        }
      }
  `,
)