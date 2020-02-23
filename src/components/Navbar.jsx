import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { isLoggedIn } from '../helpers/application_helper';
import { makeStyles } from '@material-ui/core/styles';
import AppStyles from '../assets/jss/styles/App.styles.jsx'
// eslint-disable-next-line import/no-webpack-loader-syntax
import VKLogo from '-!svg-react-loader!../assets/images/icons/VK_Blue_Logo.svg';

const useStyles = makeStyles(AppStyles);

export default function Navbar() {
  const classes = useStyles();
  const appToolBar = isLoggedIn() ? (
    <Toolbar className={classes.toolbar}>
      <Button onClick={() => window.location.href = '/squads'} color="inherit">
        Squads
      </Button>
      <Button onClick={() => window.location.href = '/about'} color="inherit">
        About
      </Button>
    </Toolbar>
  ) : (
    <Toolbar className={classes.toolbar}>
      <Button onClick={() => window.location.href = '/login'} color="inherit">
        <VKLogo width='50px'/>
        Login with VK
      </Button>
    </Toolbar>
  )

  return (
    <div className={classes.navbar}>
      <AppBar position="static">
        {appToolBar}
      </AppBar>
    </div>
  );
}