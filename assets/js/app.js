// webpack automatically bundles all modules in your
// entry points. Those entry points can be configured
// in "webpack.config.js".
//
// Import dependencies
//
import "phoenix_html"

// import 'font-awesome/css/font-awesome.min.css';
// import 'bootstrap/dist/css/bootstrap.min.css'; 
// import 'mdbreact/dist/css/mdb.css';

// Import local files
//
// Local files can be imported directly using relative paths, for example:
// import socket from "./socket"

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import CssBaseline from '@material-ui/core/CssBaseline'

const reducers = require('./modules')

import {HashProtocol, BrowserProtocol, queryMiddleware} from 'farce'
import {createFarceRouter, createRender} from 'found'
import { Resolver } from 'found-relay'
import routes from './routes'

import environment from './environment'


// We need to import the CSS so that webpack will load it.
// The MiniCssExtractPlugin is used to separate it out into
// its own CSS file.
import css from "../css/app.css"


const Router = createFarceRouter({
  // historyProtocol: new BrowserProtocol(),
  historyProtocol: new HashProtocol(),
  historyMiddlewares: [queryMiddleware],
  routeConfig: routes,

  render: createRender({})
})

ReactDOM.render((
  <Provider store={createStore(reducers)}>
    <React.Fragment>
      <CssBaseline />
      <Router resolver={new Resolver(environment)} />
    </React.Fragment>
  </Provider>
), document.getElementById('app'))