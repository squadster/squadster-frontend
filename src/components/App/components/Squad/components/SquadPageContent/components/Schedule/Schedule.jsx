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
import { dateParser } from '../../../../../../../../helpers/index'
import ScheduleStyles from './Schedule.style'
import LessonIcon from '../LessonIcon';
import { Link } from 'react-router-dom'
const useStyles = makeStyles(ScheduleStyles);

export default function Schedule(props) {
  const classes = useStyles();

  const user = props.user;
  const timetables = user.squad.timetables;
  const nearestLessonsDay = timetables.reduce((res, obj) => (new Date(obj.date) < new Date(res.date)) ? obj : res);
  const nearestDate = dateParser(nearestLessonsDay.date);

  console.log(user.squad)
  console.log(nearestDate)

  const [selectedDate, setSelectedDate] = React.useState(nearestDate);
  console.log(selectedDate)

  const [lessons, setLessons] = React.useState(
    timetables.filter(
      t => dateParser(t.date).toDateString() === selectedDate.toDateString()
    )[0].lessons
  );
  console.log('lessons? ', lessons)

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
          <div className={"my-4 mx-auto py-2 w-75"}>
            <div className='d-flex flex-row justify-content-md-between'>
              <div className='d-flex flex-md-row flex-column align-items-center'>
                <div className='d-flex flex-row'>
                  <LessonIcon lessonType={lesson.type} />
                </div>
                <div className='d-flex flex-row'>
                  <Typography variant='subtitle1'>
                    {lesson.name}
                  </Typography>
                  <Typography className='mt-2' variant='subtitle1'>
                    {lesson.teacher}
                  </Typography>
                </div>
                <div className='d-flex flex-row'>
                  <Typography>
                    {lesson.classroom}
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </Paper>
      )}
    </Paper>
  )
}
