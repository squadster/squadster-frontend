const currentUserReducer = (state, action) => {
  switch (action.type) {
    case 'SET CURRENT USER':
      return action.user || null;
    default:
      const currentUser = localStorage.currentUser ? JSON.parse(localStorage.currentUser) : null
      return currentUser;
  }
}

export default currentUserReducer;