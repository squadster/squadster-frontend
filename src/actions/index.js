export const signIn = () => {
  return { type: "SIGN IN" }
};

export const signOut = () => {
  return { type: "SIGN OUT" }
};

export const setCurrentUser = (user) => {
  return { type: "SET CURRENT USER", user: user }
}

export const setUserSquad = (squadMember) => {
  return { type: "SET USER SQUAD", squadMember: squadMember }  
}

export const updateSquadAdvertisment = (value) => {
  return { type: "UPDATE SQUAD ADVERTISMENT", value: value }
}
