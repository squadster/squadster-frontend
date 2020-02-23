function isLoggedIn() {
  window.localStorage.getItem('authToken')
}

export { isLoggedIn };