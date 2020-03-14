import { isLoggedIn } from '../helpers';

const loggedReducer = (state = isLoggedIn(), action) => {
  switch (action.type) {
    case 'SIGN IN':
      return true;
    case 'SIGN OUT':
      return false;
    default:
      return state;
  }
}

export default loggedReducer;
