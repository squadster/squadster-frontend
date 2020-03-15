export const signIn = () => {
  return { type: "SIGN IN" }
};

export const signOut = () => {
  return { type: "SIGN OUT" }
};

export const setCurrentUser = (user) => {
  return { type: "SET CURRENT USER", user: user }
};
