import { ApolloClient, ApolloLink, InMemoryCache, createHttpLink, from } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { handleRefreshToken } from '../handlers/handleRefreshToken'
import { handleRequestError } from '../handlers/handleRequestError'
import { setRequestHeaders } from '../utils/auth'
import { getToken } from '../utils/token'

const httpLink = createHttpLink({
  uri: 'http://localhost:3000/graphql',
})

const authLink = new ApolloLink((operation, forward) => {
  const token = getToken()
  setRequestHeaders({ operation, token })
  return forward(operation)
})

const errorLink = onError(({ graphQLErrors, forward, operation }) => {
  if (graphQLErrors) {
    if (graphQLErrors[0]?.message === 'Unauthorized') {
      //  We assume we have both tokens needed to run the async request
      handleRefreshToken({ forward, operation })
    }
    handleRequestError({ graphQLErrors, operation })
  }
})

export const client = new ApolloClient({
  link: from([authLink, errorLink, httpLink]),
  cache: new InMemoryCache(),
})
