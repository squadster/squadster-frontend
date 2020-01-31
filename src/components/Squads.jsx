import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SquadsStyles from '../assets/jss/styles/Squads.styles.jsx'

const useStyles = makeStyles(SquadsStyles);

export default function Squads() {
  const classes = useStyles();

  return(
    <>
      <Button className={classes.root}>Example Button</Button>
      <h2>Squads goes here</h2>
    </>
  );
}
