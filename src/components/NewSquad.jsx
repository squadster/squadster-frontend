import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, InputBase, Container, Typography, Button } from '@material-ui/core';
import SquadsStyles from '../assets/jss/styles/Squad.styles.jsx'
import { useQuery } from '@apollo/react-hooks';
import Spinner from './Spinner.jsx'
import gql from 'graphql-tag';
import SVG from 'react-inlinesvg';
import { Link } from 'react-router-dom'


const useStyles = makeStyles(SquadsStyles);

function createSquad() {

};

export default function NewSquad() {
  const classes = useStyles();
  return (
    <Container>
    <Paper className={classes.newSquadMessageRoot} variant="outlined" square>
      <div className='d-flex flex-column flex-sm-row'>
        <SVG className={classes.newSquadMessageIcon} src='icons/soldier.svg' width='50%'/>
        <div className='d-flex flex-column ml-sm-4 mt-4 mt-sm-0'>
          <Typography className={classes.newSquadMessageTitle} variant='h4' component='h1'>
            Похоже что вы ещё не вступили ни в один взвод...
          </Typography>
          <Typography className={classes.newSquadMessageText} variant='h6' component='h2'>
            Отправляйте запросы на вступление и ожидайте подтверждения командира взвода. Мы уведомим вас как только ваша заявка будет подтверждена.
          </Typography>
          <InputBase
            placeholder='Номер взвода'
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            onChange={createSquad}
          />
          <Link to='/squads'>
            <Button variant="contained" color="primary" size='large' className={classes.newSquadMessageLink}>Создать взвод</Button>
          </Link>
        </div>
      </div>
    </Paper>
  </Container>
  );
}
