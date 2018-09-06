const { handleActions } = require('redux-actions')

const FETCH_TASKS = 'tasks/FETCH_TASKS'
const FETCH_TASK = 'tasks/FETCH_TASK'

module.exports = {
  fetchMoviesActionCreator: (tasks) => ({
    type: FETCH_TASKS,
    tasks
  }),
  fetchMovieActionCreator: (index) => ({
    type: FETCH_TASK,
    index
  }),
  reducer: handleActions({
    [FETCH_TASKS]: (state, action) => ({
      ...state,
      all: action.tasks
    }),
    [FETCH_TASK]: (state, action) => ({
      ...state,
      current: state.all[action.index - 1]
    })
  }, {
    tasks: [],
    task: {}
  })
}
