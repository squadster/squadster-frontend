import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import SquadsStyles from '../assets/jss/styles/Squads.styles.jsx'
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';

const useStyles = makeStyles(SquadsStyles);

export default function Squads() {
  const classes = useStyles();

  return (
    <div className='row rounded'>
      <Paper className={classes.paper}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder='Поиск'
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ 'aria-label': 'search' }}
        />

        <h4 className={classes.h4}>Номер взвода</h4>
        <h4 className={classes.h4}>Командир</h4>
      </Paper>
    </div>
  );
}
