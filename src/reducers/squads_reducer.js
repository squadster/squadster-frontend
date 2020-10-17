const squadsReducer = (state, action) => {
  const { userRequest, squad } = action
  
  switch (action.type) {
    case 'SET SQUADS':
      return action.squads
    case 'DELETE SQUAD REQUEST':
      squad.requests = squad.requests.filter((request => request !== userRequest))
      state[state.indexOf(squad)] = squad
      return state
    case 'PUSH REQUEST':
      state.forEach(squad => {
        squad.requests = squad.requests.filter((request) => request.user.id !== userRequest.user.id)
      })
  
      squad.requests.push(userRequest)
      state[state.indexOf(squad)] = squad
      return state
    default:
      return []
  }
}

export default squadsReducer
