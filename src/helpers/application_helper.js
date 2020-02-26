function isLoggedIn() {
  return !!window.localStorage.getItem('authToken');
}

export { isLoggedIn };
