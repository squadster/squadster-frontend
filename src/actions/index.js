export const setCurrentUser = (user) => {
  return { type: "SET CURRENT USER", user: user }
}

export const setUserSquad = (squadMember) => {
  return { type: "SET USER SQUAD", squadMember: squadMember }  
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
