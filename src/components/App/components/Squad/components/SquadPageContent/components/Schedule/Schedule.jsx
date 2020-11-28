import React from 'react';
import 'date-fns';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux'
import { Typography, Paper, TextField, Button, Avatar } from '@material-ui/core'
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { dateParser, sortBy } from '../../../../../../../../helpers/index'
import ScheduleStyles from './Schedule.style'
import LessonIcon from '../LessonIcon';
import { Link } from 'react-router-dom'
const useStyles = makeStyles(ScheduleStyles);

export default function Schedule(props) {
  const classes = useStyles();
  const user = props.user;
  const timetables = sortBy(user.squad.timetables, 'index');

  const nearestLessonsDay = timetables.reduce(
    (res, obj) => (new Date(obj.date) < new Date(res.date)) ? obj : res
  );
  const nearestDate = dateParser(nearestLessonsDay.date);
  const [selectedDate, setSelectedDate] = React.useState(nearestDate);

  const [lessons, setLessons] = React.useState(
    sortBy(
      timetables.filter(
        t => dateParser(t.date).toDateString() === selectedDate.toDateString()
      )[0].lessons,
      'index'
    )
  );

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setLessons();
  };

  return (
    <Paper className={'d-flex flex-column mt-5 mb-5'} square variant="outlined">
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
      {lessons.map(lesson =>
        <Paper className="position-relative squad-card-member" square variant='outlined'>
          <div className={"row my-4 mx-auto py-2 w-75"}>
            <div className='col-sm-6 d-flex flex-row justify-content-md-between'>
              <div className='d-flex flex-md-row flex-column align-items-center'>
                <div className='d-flex flex-row'>
                  <LessonIcon lessonType={lesson.type} />
                </div>
                <div className='d-flex flex-column ml-md-5 ml-0 my-auto text-center text-md-left'>
                  <Typography variant="h4" component="h2">
                    {lesson.name}
                  </Typography>
                  <Typography className='mt-2' variant='subtitle1'>
                    {lesson.teacher}
                  </Typography>
                  <Typography>
                    {lesson.classroom}
                  </Typography>
                </div>
              </div>
            </div>
            <div className='col-sm-6'>
            <div className='d-flex flex-row'>
                  {lesson.note}
                </div>
            </div>
          </div>
        </Paper>
      )}
    </Paper>
  )
}
