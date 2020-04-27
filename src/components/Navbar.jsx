import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Toolbar, AppBar, IconButton, Collapse } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import AppStyles from '../assets/jss/styles/App.styles.jsx'
import SVG from 'react-inlinesvg';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { API_URL } from '../constants'
import { isMobile, logout } from '../helpers'

const useStyles = makeStyles(AppStyles);

export default function Navbar() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.currentUser);
  const squad = useSelector(state => state.currentUser ? state.currentUser.squad : undefined);
  const [expanded, setExpanded] = useState(isMobile ? false : true);

  return (
    <div className={classes.navbar}>
      <AppBar height='10vh' position="static">
        { isMobile ?
          <IconButton onClick={() => setExpanded(!expanded)} className={classes.collapsedButton} edge="end"  color="inherit">
            <MenuIcon />
          </IconButton> : ''}
        <Collapse in={expanded}>
          {currentUser ? (
            <Toolbar className={classes.toolbar}>
              { currentUser.squad ?
              <Link to='/my-squad'>
                <Button className={classes.navbarLink}>Мой взвод</Button>
              </Link> : ''
              }
              {
                !squad && <Link to='/squads'>
                  <Button className={classes.navbarLink}>Взводы</Button>
                </Link>
              }
              <Link to='/about'>
                <Button className={classes.navbarLink}>О сайте</Button>
              </Link>
              <Button className={classes.navbarLink} onClick={() => logout(dispatch)} color="inherit">
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
        </Collapse>
      </AppBar>
    </div>
  );
}
