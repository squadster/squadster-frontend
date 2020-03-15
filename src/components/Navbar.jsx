import React from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import AppStyles from '../assets/jss/styles/App.styles.jsx'
import SVG from 'react-inlinesvg';
import { API_URL } from '../constants'
import { useDispatch } from 'react-redux';
import { signOut } from '../actions';
import { Link } from 'react-router-dom';


const useStyles = makeStyles(AppStyles);

function logout(reducer) {
  axios({ method: 'DELETE', url: `${API_URL}/api/auth`})
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
            <Link to='/my-squad'>
              <Button className={classes.navbarLink}>Мой взвод</Button>
            </Link>
            <Link to='/squads'>
              <Button className={classes.navbarLink}>Взводы</Button>
            </Link>
            <Link to='/about'>
              <Button className={classes.navbarLink}>О сайте</Button>
            </Link>
            <Button onClick={() => logout(dispatch)} color="inherit">
              Выйти
            </Button>
          </Toolbar>
          ) : (
          <Toolbar className={classes.toolbar}>
            <Button onClick={() => window.location.href = `${API_URL}/api/auth/vk`} color="inherit">
              <SVG src='VK_Blue_Logo.svg' width='50px'/>
              Войти
            </Button>
          </Toolbar>
          )}
      </AppBar>
    </div>
  );
}
