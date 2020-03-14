import ApolloClient from 'apollo-boost'
import { API_URL } from '../constants'

const apolloClient = new ApolloClient({
  uri: API_URL + '/api/query',
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
  if (localStorage.currentUser)
    return JSON.parse(localStorage.currentUser)
}

export {apolloClient, isLoggedIn, getCurrentUser };
