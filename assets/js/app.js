// webpack automatically bundles all modules in your
// entry points. Those entry points can be configured
// in "webpack.config.js".
//
// Import dependencies
//
import "phoenix_html"

// Import local files
//
// Local files can be imported directly using relative paths, for example:
// import socket from "./socket"

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
const reducers = require('./modules')
import Layout from './layout'
import {BrowserRouter as Router} from 'react-router-dom'

// We need to import the CSS so that webpack will load it.
// The MiniCssExtractPlugin is used to separate it out into
// its own CSS file.
import css from "../css/app.css"


const Hello = () => <h1>Hello</h1>

ReactDOM.render((
  <Provider store={createStore(reducers)}>
    <Router>
        <Layout />
    </Router>
  </Provider>
), document.getElementById('app'))