import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  IndexRoute,
} from 'react-router-dom'
import NavBar from './components/NavBar/nav-bar'
import CalendarPage from './components/MyCalendar/CalendarPage'

const Layout = () => (
  <div>
    <Route path="/" component={CalendarPage} />
  </div>
)

export default Layout

