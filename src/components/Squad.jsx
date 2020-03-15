import React from 'react'
import { useDispatch } from 'react-redux';
import { useQuery } from '@apollo/react-hooks';
import { useSelector } from 'react-redux';
import { GET_USER_SQUAD } from '../requests';
import { setUserSquad } from '../actions';
import Spinner from './Spinner'
import { Container, Typography, Paper, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SquadStyles from '../assets/jss/styles/Squad.styles'
import SVG from 'react-inlinesvg';

const useStyles = makeStyles(SquadStyles)

function squadPageEmpty(classes) {
  return <Container maxWidth='md'>
    <Paper className={classes.emptySquadMessageRoot} variant="outlined" square>
      <div className='d-flex flex-row'>
        <SVG className={classes.emptySquadMessageIcon} src='icons/soldier.svg' width='50%'/>
        <div className='d-flex flex-column'>
          <Typography className='mb-3' variant='h4' component='h1'>
            Похоже что вы ещё не вступили ни в один взвод...
          </Typography>
          <Typography variant='h6' component='h2'>
            Отправляйте запросы на вступление и ожидайте подтверждения командира взвода. Мы уведомим вас как только ваша заявка будет подтверждена.
          </Typography>
          <Button  variant="contained" color="primary" size='large' className={classes.emptySquadMessageLink} href='/squads'>Понял</Button>
        </div>
      </div>
    </Paper>
  </Container> 
}

function squadPage(classes) {
  return <> </>
}

export default function Squad() {
  const user = useSelector(state => state.currentUser)
  const dispatch = useDispatch();
  const classes = useStyles();
  const { loading, data } = useQuery(GET_USER_SQUAD, { skip: user.squad, variables: { id: user.id } } )

  if (!user.squad && loading) {
    return <Spinner/>
  } else {
    if (!user.squad && data.squadMember) {
      dispatch(setUserSquad(data.squadMember.squad))
      return squadPage(user)
    } else {
      if (user.squad)
        return squadPage(user, classes)
      else
        return squadPageEmpty(classes) 
    }
  }
}
