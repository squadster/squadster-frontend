const currentUserReducer = (state, action) => {
  switch (action.type) {
    case 'SET CURRENT USER':
      return action.user
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
      let queueNumber = state.squad.members.filter((member) => member.role === 'student').reduce((prev, current) => (prev.queueNumber > current.queueNumber) ? prev : current).queueNumber

      if (member.role !== 'student' && member.newAttributes.role === 'student') {
        queueNumber += 1
        member.queueNumber = queueNumber
      }
      member.role = newRole

      if (newRole === 'commander') {
        action.currentUserMember.role = 'student'
        action.currentUserMember.queueNumber = queueNumber + 1
      }
      return state
    case 'DELETE SQUAD REQUEST':
      const squad = state.squad
      state.squad.requests = squad.requests.filter((request => request.id !== action.request.id))
      return state
    case 'APPROVE SQUAD REQUEST':
      state.squad.members.push(action.squadMember)
      return state
    case 'SET SQUAD':
      state.squad = action.squad
      state.squadMember = action.squad.members.find((member) => member.user.id === state.id)

      return state
    case 'SET SQUAD MEMBERS':
      state.squad.members = action.members
      return state
    case 'DELETE SQUAD':
      state.squad = null
      state.squadMember = null
      return state
    case 'UPDATE SQUAD':
      if (state.squad.id === action.squad.id) {
        const updatedSquad = { ...state.squad, ...action.params }
        state.squad = updatedSquad
        
        return state
      } else {
        return state
      }
    default:
      return state ? state : null
  }
}

export default currentUserReducer;
