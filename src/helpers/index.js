import ApolloClient from 'apollo-boost'
import { API_HOST } from '../constants'

const apolloClient = new ApolloClient({
  uri: API_HOST + '/api/query',
  request: (operation) => {
    const token = localStorage.authToken
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    })
  }
})

function isLoggedIn() {
  return !!window.localStorage.getItem('authToken');
}

function getCurrentUser() {
  if (localStorage.user)
    return JSON.parse(localStorage.user)
}

export {apolloClient, isLoggedIn, getCurrentUser };
