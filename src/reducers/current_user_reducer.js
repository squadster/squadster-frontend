const currentUserReducer = (state, action) => {
  switch (action.type) {
    case 'SET CURRENT USER':
      return action.user || null;
    case 'SET USER SQUAD':
      state.squad = action.squadMember.squad
      state.queueNumber = action.squadMember.queueNumber
      state.role = action.squadMember.role
      return state
    case 'UPDATE SQUAD ADVERTISMENT':
      state.squad.advertisment = action.value
      return state
    default:
      const currentUser = localStorage.currentUser ? JSON.parse(localStorage.currentUser) : null
      return currentUser
  }
}

export default currentUserReducer;