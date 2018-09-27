import moment from 'moment'
import {commitMutation, graphql} from 'react-relay'
import environment from '../environment'

const mutation = graphql`
    mutation CreateTaskMutation($input: CreateTaskObjectInput!) {
        createTaskObject(input: $input) {
            task {
                title
                description
                start
                end
                aborted
                progress
            }
        }
    }
`

export default (
    task,
    onSuccess,
    onError
) => {
    const variables = {
        input: {
            task: task
        },
    }
    console.log("New task from:", variables)
    commitMutation(
        environment,
        {
            mutation,
            variables,
            onCompleted: () => {
                onSuccess()
            },
            onError: err => {
                onError(err)
            },
        },
    )
}