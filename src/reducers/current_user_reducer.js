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
      const newRole = member.newAttributes.role
      member.role = newRole

      if (newRole === 'commander')
        action.currentUserMember.role = 'student'
      return state
    case 'DELETE SQUAD REQUEST':
      const squad = state.squad
      state.squad.requests = squad.requests.filter((request => request.id !== action.request.id))
      return state
    case 'APPROVE SQUAD REQUEST':
      state.squad.members.push(action.squadMember)
      return state
    default:
      const currentUser = localStorage.currentUser ? JSON.parse(localStorage.currentUser) : null
      return currentUser
  }
}

export default currentUserReducer;