import React from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FooterStyles from '../../App.styles'
import { Link } from 'react-router-dom';
import Logo from './components/Logo';


const useStyles = makeStyles(FooterStyles);

export default function Footer() {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <div class="footer-copyright text-center py-3">© 2020 squadster
        <Logo/>
        <Link to='/about'>
          <Button>О сайте</Button>
        </Link>
      </div>
    </footer>
  );
}
