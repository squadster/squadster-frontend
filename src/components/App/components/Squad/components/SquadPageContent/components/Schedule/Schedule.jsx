import React from 'react';
import 'date-fns';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux'
import { Typography, Paper, TextField, Button } from '@material-ui/core'
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';


export default function Schedule(props) {
  const user = props.user;
  console.log(user.squad)

  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <Paper className={'d-flex flex-column mt-5 mb-5'}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify="space-around">
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="dd/MM/yyyy"
            margin="normal"
            id="date-picker-inline"
            value={selectedDate}
            onChange={handleDateChange}
          />
        </Grid>
      </MuiPickersUtilsProvider>
      <Typography variant='h5'>
        Oбъявление:
      </Typography>
    </Paper>
  )
}
