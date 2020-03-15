const loggedReducer = (state, action) => {
  switch (action.type) {
    case 'GET_SQUADS':
      return state;
    case 'SIGN_OUT':
      return false;
    default:
      return state;
  }
}

export default loggedReducer;
