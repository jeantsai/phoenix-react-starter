import React from 'react'
import {Route, makeRouteConfig} from 'found'
import environment from './environment'
import CalendarApp from './components/CalendarApp'
import AppBar from './components/AppBar'
import CalendarView from './components/CalendarView'
import TaskEditor from './components/TaskEditor'


const RoutesQuery = graphql`
    query routes_CalendarApp_Query {
        taskList {
            ...CalendarApp_taskList
        }
    }
`
export default makeRouteConfig(
    <Route
      path="/"
      Component={CalendarApp}
      query={RoutesQuery}
      >
      <Route
        Component={CalendarView}
        query={graphql`
        query routes_CalendarView_Query {
            taskList {
                ...CalendarView_taskList
            }
        }
    `}
        />
      <Route
        path="task"
        Component={TaskEditor}
        />
      <Route
        path="/task/:taskId"
        Component={TaskEditor}
        />
    </Route>
)

// const Layout = () => (
//   <Router
//   >
//     <Route path='/' render={() => (
//       <QueryRenderer
//         environment = {environment}
//         query = {CalendarPageQuery}
//         render = {({error, props}) => {
//             console.log("Props from QueryRenderer: ", props)
//             if (error) {
//                 return <div>{error.message}</div>
//             } else if (props) {
//                 return <MyCalendar events={props.allTasks}/>
//             }
//             return <div>Loading</div>
//         }}
//       />
//     )}>
//       <Switch>
//         <Route exact path="/" component={MyCalendar} />
//         <Route path="/task" component={TaskPaper} />
//         <Route path="/newtask" component={TaskPaper} />
//       </Switch>
//     </Route>
//   </Router>
// )