import {commitMutation, graphql} from 'react-relay'
import environment from '../environment'

const mutation = graphql`
    mutation DeleteTaskMutation($id: String!) {
        deleteTask(id: $id) {
            task {
                id
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
    id,
    callback,
) => {
    const variables = {
        id: id
    }

    commitMutation(
        environment,
        {
            mutation,
            variables,
            onCompleted: () => {
                callback()
            },
            onError: err => console.error(err),
        },
    )
}