const { combineReducers } = require('redux')
const {
  reducer: tasks
} = require('./tasks')

module.exports = combineReducers({
  tasks
})
