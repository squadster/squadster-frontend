import React from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import AppStyles from '../assets/jss/styles/App.styles.jsx'
import SVG from 'react-inlinesvg';
import { API_HOST } from '../constants'
import { getCurrentUser } from '../helpers'
import { useDispatch } from 'react-redux';
import { signOut, setCurrentUser } from '../actions';


const useStyles = makeStyles(AppStyles);

function logout(reducer) {
  axios({ method: 'DELETE', url: `${API_HOST}/api/auth`})
       .then(() => {
          localStorage.removeItem('authToken')
          localStorage.removeItem('currentUser')
          reducer(signOut());

          window.location.href = '/'
        })
}

export default function Navbar() {
  const classes = useStyles();
  const loggedIn = useSelector(state => state.isLoggedIn)
  const dispatch = useDispatch()

  return (
    <div className={classes.navbar}>
      <AppBar height='10vh' position="static">
        {loggedIn ? (
          <Toolbar className={classes.toolbar}>
            <Button onClick={() => window.location.href = '/squads'} color="inherit">
              Squads
            </Button>
            <Button onClick={() => window.location.href = '/about'} color="inherit">
              About
            </Button>
            <Button onClick={() => logout(dispatch)} color="inherit">
              Logout
            </Button>
          </Toolbar>
          ) : (
          <Toolbar className={classes.toolbar}>
            <Button onClick={() => window.location.href = `${API_HOST}/api/auth/vk`} color="inherit">
              <SVG src='VK_Blue_Logo.svg' width='50px'/>
              Login with VK
            </Button>
          </Toolbar>
          )}
      </AppBar>
    </div>
  );
}
