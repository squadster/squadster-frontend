import React from 'react'
import { useSelector } from 'react-redux';
import { Container, Typography, Paper, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SquadStyles from '../../assets/jss/styles/squad_page/Squad.styles'
import SquadPageContent from './SquadPageContent'
import SVG from 'react-inlinesvg';
import { Link } from 'react-router-dom'

const useStyles = makeStyles(SquadStyles)

function squadPageEmpty(classes) {
  return <Container maxWidth='md'>
    <Paper className={classes.emptySquadMessageRoot} variant="outlined" square>
      <div className='d-flex flex-column flex-sm-row'>
        <SVG className={classes.emptySquadMessageIcon} src='icons/soldier.svg' width='50%'/>
        <div className='d-flex flex-column ml-sm-4 mt-4 mt-sm-0'>
          <Typography className={classes.emptySquadMessageTitle} variant='h4' component='h1'>
            Похоже что вы ещё не вступили ни в один взвод...
          </Typography>
          <Typography className={classes.emptySquadMessageText} variant='h6' component='h2'>
            Отправляйте запросы на вступление и ожидайте подтверждения командира взвода. Мы уведомим вас как только ваша заявка будет подтверждена.
          </Typography>
          <Link to='/squads'>
            <Button variant="contained" color="primary" size='large' className={classes.emptySquadMessageLink}>Понял</Button>
          </Link>
        </div>
      </div>
    </Paper>
  </Container> 
}

export default function Squad() {
  const user = useSelector(state => state.currentUser)
  const classes = useStyles()
  
  return user.squad ? <SquadPageContent user={user}/> : squadPageEmpty(classes) 
}
