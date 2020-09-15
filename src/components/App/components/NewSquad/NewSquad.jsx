import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, InputBase, Container, Typography, Button } from '@material-ui/core';
import SquadsStyles from './NewSquad.styles';
import { useMutation } from '@apollo/react-hooks';
import { Redirect } from 'react-router-dom';
import SVG from 'react-inlinesvg';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { SET_SQUAD } from 'requests';
import { useSelector } from 'react-redux';
import { setSquad } from 'actions';
import { useDispatch } from 'react-redux'


const useStyles = makeStyles(SquadsStyles);

export default function NewSquad() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const squad = useSelector(state => state.currentUser.squad);

  const [day, setDay] = React.useState();
  const [squadNumber, setSquadNumber] = React.useState();
  const [sendRequest] = useMutation(SET_SQUAD, { onCompleted: (data) => dispatch(setSquad(data.createSquad)) } );

  if (squad) {
    return  <Redirect to='/my-squad'/>
  }

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
            <div className='row justify-content-center'>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor='number-native-simple'>Номер взвода</InputLabel>
                <InputBase
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{
                    id: 'number-native-simple',
                  }}
                  onChange={e => setSquadNumber(e.target.value)}
                />
              </FormControl>
            </div>
            <div className='row justify-content-center'>
              <FormControl className={classes.formControl}>
                <InputLabel
                  htmlFor='day-native-simple'
                  shrink={true}
                  disableAnimation={false}>
                    День занятия
                </InputLabel>
                <Select
                  classes={{
                    root: classes.selectRoot,
                  }}
                  value={day}
                  onChange={e => setDay(e.target.value)}
                  id='day-native-simple'
                  displayEmpty
                  className={classes.selectEmpty}
                >
                  <MenuItem value={1}>Понедельник</MenuItem>
                  <MenuItem value={2}>Вторник</MenuItem>
                  <MenuItem value={3}>Среда</MenuItem>
                  <MenuItem value={4}>Четверг</MenuItem>
                  <MenuItem value={5}>Пятница</MenuItem>
                  <MenuItem value={6}>Суббота</MenuItem>
                </Select>
              </FormControl>
            </div>
            <Button
              variant='contained'
              color='primary'
              size='large'
              className={classes.newSquadMessageLink}
              onClick={
                () => sendRequest({
                  variables: {
                    squad_number: squadNumber,
                    class_day: day
                  }
                })
              }
              disabled={!squadNumber || !day}
            >
              Создать взвод
            </Button>
          </div>
        </div>
      </Paper>
    </Container>
  );
}
