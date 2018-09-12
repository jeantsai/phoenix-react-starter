import {
    Environment,
    Network,
    RecordSource,
    Store,
  } from 'relay-runtime'
  
  const store = new Store(new RecordSource())
  
  const network = Network.create((operation, variables) => {
    console.log("Fetching data from GraphQL server ...")
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
    })
  })
  
  const environment = new Environment({
    network,
    store,
  })
  
  export default environment