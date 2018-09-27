import {
    Environment,
    Network,
    RecordSource,
    Store,
  } from 'relay-runtime'
  
  const store = new Store(new RecordSource())
  
  const network = Network.create((operation, variables) => {
    console.log("Accessing GraphQL server with data:", JSON.stringify({
      query: operation.text,
      variables,
    }))
    return fetch('http://localhost:8600/api', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: operation.text,
        variables,
      }),
    }).then(response => {
      return response.json()
    }).then(json => {
      // https://github.com/facebook/relay/issues/1816
      if (operation.operationKind === 'mutation' && json.errors) {
        return Promise.reject(json.errors)
      }
      return Promise.resolve(json)
    })
  })
  
  const environment = new Environment({
    network,
    store,
  })
  
  export default environment