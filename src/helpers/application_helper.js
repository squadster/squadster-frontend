function isLoggedIn() {
  return !(window.localStorage.getItem('authToken') === null)
}

export { isLoggedIn };