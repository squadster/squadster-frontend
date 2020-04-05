import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, InputBase, Container, Typography, Button } from '@material-ui/core';
import SquadsStyles from '../assets/jss/styles/Squad.styles.jsx'
import { useMutation } from '@apollo/react-hooks';
import SVG from 'react-inlinesvg';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { SET_SQUAD } from '../requests';
import { useSelector } from 'react-redux';


const useStyles = makeStyles(SquadsStyles);

export default function NewSquad() {
  const classes = useStyles();
  const user = useSelector(state => state.currentUser)
  const [day, setDay] = React.useState(0);
  const [squadNumber, setSquadNumber] = React.useState();
  const [sendRequest] = useMutation(SET_SQUAD, { onCompleted: () => window.location.href ='/my-squad' });

  if (user && user.squad) {
    return window.location.href ='/my-squad'
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
            <div className='col-sm'>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="number-native-simple">Номер взвода</InputLabel>
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
            <div className='col-sm'>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="day-native-simple">День недели</InputLabel>
                <Select
                  value={day}
                  onChange={e => setDay(e.target.value)}
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
            <Button variant='contained' color='primary' size='large' className={classes.newSquadMessageLink} onClick={() => sendRequest({ variables: { squad_number: squadNumber, class_day: day } })}>Создать взвод</Button>
          </div>
        </div>
      </Paper>
    </Container>
  );
}
