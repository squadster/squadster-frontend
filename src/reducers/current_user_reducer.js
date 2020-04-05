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
    case 'DELETE SQUAD MEMBER':
      const members = state.squad.members
      state.squad.members = members.filter(member => member !== action.member)
      return state
    case 'UPDATE SQUAD MEMBER':
      const member = action.member
      member.role = member.newAttributes.role

      return state
    default:
      const currentUser = localStorage.currentUser ? JSON.parse(localStorage.currentUser) : null
      return currentUser
  }
}

export default currentUserReducer;