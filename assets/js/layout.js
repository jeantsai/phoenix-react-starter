import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  IndexRoute,
} from 'react-router-dom'
import NavBar from './components/NavBar/nav-bar'
import MyCalendar from './components/MyCalendar/my-calendar'

const Layout = () => (
  <div>
    <Route path="/" component={MyCalendar} />
  </div>
)

export default Layout

