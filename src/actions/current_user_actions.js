export const setCurrentUser = (user) => {
  if (user && user.squadMember) {
    user.squad = user.squadMember.squad
    user.queueNumber = user.squadMember.queueNumber
    user.role = user.squadMember.role
  }

  return { type: "SET CURRENT USER", user: user }
}

export const updateSquadAdvertisment = (value) => {
  return { type: "UPDATE SQUAD ADVERTISMENT", value: value }
}

export const deleteSquadMember = member => {
  return { type: "DELETE SQUAD MEMBER", member: member }
}

export const updateSquadMember = (member, currentUserMember) => {
  return { type: "UPDATE SQUAD MEMBER", member: member, currentUserMember: currentUserMember }
}

export const deleteSquadRequest = request => {
  return { type: "DELETE SQUAD REQUEST", request: request }
}

export const approveSquadRequest = (member) => {
  return { type: "APPROVE SQUAD REQUEST", squadMember: member }
}

export const setSquad = (squad) => {
  return { type: "SET SQUAD", squad: squad }
}

export const setSquadMembers = (members) => {
  return { type: "SET SQUAD MEMBERS", members: members }
}

export const updateSquadClassDay = (value) => {
  return { type: "UPDATE SQUAD CLASS DAY", value: value }
}

export const updateSquadNumber = (value) => {
  return { type: "UPDATE SQUAD NUMBER", value: value }
}
