import { isLoggedIn } from '../helpers/application_helper';

const loggedReducer = (state = isLoggedIn(), action) => {
  switch (action.type) {
    case 'SIGN_IN':
      return true;
    case 'SIGN_OUT':
      return false;
    default:
      return state;
  }
}

export default loggedReducer;
