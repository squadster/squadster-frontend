import React from 'react';
import 'date-fns';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux'
import { Typography, Paper, TextField, Button, Avatar, IconButton } from '@material-ui/core'
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
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { COMMANDER_ROLES } from 'static'
import AddIcon from '@material-ui/icons/Add';
import { InputBase, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { useMutation } from '@apollo/react-hooks'
import { UPDATE_LESSONS, CREATE_LESSON } from 'requests'
import { setSquadTimetable } from 'actions/squads_actions'


const useStyles = makeStyles(ScheduleStyles);

function reorder(list, startIndex, endIndex) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  result.forEach((member, index) => {
    member.queueNumber = index + 1
  })

  return result;
};

export default function Schedule(props) {
  const dispatch = useDispatch()

  const classes = useStyles();
  const user = props.user;
  console.log('user: ', user)
  const timetables = sortBy(user.squad.timetables, 'index');

  const nearestLessonsDay = timetables.reduce(
    (res, obj) => (new Date(obj.date) < new Date(res.date)) ? obj : res
  );
  const nearestDate = dateParser(nearestLessonsDay.date);
  const [selectedDate, setSelectedDate] = React.useState(nearestDate);

  const timetableForDate = timetables.filter(t => dateParser(t.date).toDateString() === selectedDate.toDateString())[0];

  const [lessons, setLessons] = React.useState(
    timetableForDate ? sortBy(
      timetableForDate.lessons,
      'index'
    ) : []
  );

  const [lesson, setLesson] = React.useState('');
  const [lessonType, setLessonType] = React.useState('');
  const [lessonName, setLessonName] = React.useState('');
  const [lessonTeacher, setLessonTeacher] = React.useState('');
  const [lessonClassroom, setLessonClassroom] = React.useState('');
  const [lessonNote, setLessonNote] = React.useState('');
  const [modifyLessonMode, setModifyLessonMode] = React.useState(false);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setLessons();
  };

  const handleModifyLessonMode = (lesson) => {
    // setSelectedDate(date);
    setLessons();
  };

  function noLessons() {
    return <div className='d-flex flex-column text-center py-4'>
      <Typography variant='subtitle1'>
        В этот день нет занятий
      </Typography>
    </div>
  }
  const [updateSquadTimetable] = useMutation(UPDATE_LESSONS)
  const [createLesson] = useMutation(
    CREATE_LESSON,
    {
      onCompleted: (data) => {
        timetables[timetables.indexOf(timetableForDate)] = {
          date: timetableForDate.date,
          lessons: [...lessons, data.createLesson]
        }
        dispatch(setSquadTimetable(user.squad, timetables))
        setLessons([...lessons, data.createLesson])
        setModifyLessonMode(false)
      }
    }
  );

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination)
      return

    const newLessons = reorder(
      lessons,
      result.source.index,
      result.destination.index
    ).map((lesson, index) => { lesson.index = index + 1; return lesson } );

    timetables[timetables.indexOf(timetableForDate)] = { date: timetableForDate.date, lessons: newLessons }

    dispatch(setSquadTimetable(user.squad, timetables))
    setLessons(newLessons)
    updateSquadTimetable({ variables: { lessons: newLessons.map(({ id, index }) => ({ id, index }))}})
  }


  function createOrUpdateLesson (lesson = undefined) {
    return (
      <Paper className="position-relative squad-card-member" square variant='outlined'>
        <div className={"row mx-auto py-2 w-75"}>
          <div className='col-sm-8 d-flex flex-row justify-content-md-between'>
            <div className='d-flex flex-md-row flex-column align-items-center'>
              <div className='d-flex flex-row'>
               <InputLabel
                  htmlFor='type-native-simple'
                  shrink={true}
                  disableAnimation={false}>
                    Тип занятия
                </InputLabel>
                <Select
                  classes={{
                    root: classes.selectRoot,
                  }}
                  value={lesson ? lesson.type : lessonType}
                  onChange={e => setLessonType(e.target.value)}
                  id='type-native-simple'
                  displayEmpty
                  className={classes.selectEmpty}
                >
                  <MenuItem value={'practical'}>ПЗ</MenuItem>
                  <MenuItem value={'lecture'}>ЛК</MenuItem>
                  <MenuItem value={'lab'}>ЛР</MenuItem>
                </Select>
              </div>
              <div className='d-flex flex-column ml-md-5 ml-0 my-auto text-center text-md-left'>
                <InputLabel htmlFor='name-native-simple'>Название предмета</InputLabel>
                <InputBase
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  value={lesson ? lesson.name : lessonName}
                  inputProps={{
                    id: 'name-native-simple',
                  }}
                  onChange={e => setLessonName(e.target.value)}
                  required
                />
                <InputLabel htmlFor='teacher-native-simple'>Преподаватель</InputLabel>
                <InputBase
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  value={lesson ? lesson.teacher : lessonTeacher}
                  inputProps={{
                    id: 'teacher-native-simple',
                  }}
                  onChange={e => setLessonTeacher(e.target.value)}
                />
                <InputLabel htmlFor='classroom-native-simple'>Адитория</InputLabel>
                <InputBase
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  value={lesson ? lesson.classroom : lessonClassroom}
                  inputProps={{
                    id: 'classroom-native-simple',
                  }}
                  onChange={e => setLessonClassroom(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className='col-sm-4'>
            <InputLabel htmlFor='note-native-simple'>Заметки</InputLabel>
              <InputBase
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputMultiline
                value={lesson ? lesson.note : lessonNote}
                inputProps={{
                  id: 'note-native-simple',
                }}
                onChange={e => setLessonNote(e.target.value)}
              />
            <Button
              variant='contained'
              color='primary'
              size='large'
              style={{ marginTop: '60px' }}
              className={classes.newSquadMessageLink}
              onClick={
                () => createLesson({
                  variables: {
                    timetableId: timetableForDate.id,
                    name: lessonName,
                    teacher: lessonTeacher,
                    index: timetableForDate.lessons.length + 1,
                    note: lessonNote,
                    classroom: lessonClassroom,
                    type: lessonType
                  }
                })
              }
            >
            Добавить урок
          </Button>
          </div>
        </div>
      </Paper>
    )
  }

  return (
    <Paper className={'d-flex flex-column mt-5 mb-5'} square variant="outlined">
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <div className='row justify-content-md-center'>
          <div className='col-sm-1'>
            <IconButton
              onClick={
                () => handleDateChange(new Date(selectedDate.setDate(selectedDate.getDate() - 7)))
              }
              edge="end"
              color="inherit"
            >
              <ChevronLeftIcon style={{ marginTop: '40%' }}/>
            </IconButton>
          </div>
          <div className='col-sm-3'>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="dd/MM/yyyy"
              margin="normal"
              id="date-picker-inline"
              value={selectedDate}
              onChange={handleDateChange}
            />
          </div>
          <div className='col-sm-1'>
            <IconButton
              onClick={
                () => handleDateChange(new Date(selectedDate.setDate(selectedDate.getDate() + 7)))
              }
              edge="end"
              color="inherit"
            >
              <ChevronRightIcon style={{ marginTop: '40%' }}/>
            </IconButton>
          </div>
        </div>
      </MuiPickersUtilsProvider>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable isDropDisabled={!COMMANDER_ROLES.includes(user.squadMember.role)} droppableId='lessons'>
          {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {lessons ?
              lessons.map((lesson, index) => {
                return (
                  <Draggable isDragDisabled={!COMMANDER_ROLES.includes(user.squadMember.role)} key={lesson.id} draggableId={lesson.id} index={index}>
                    {(provided, snapshot) => (
                      <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <Paper className="position-relative squad-card-member" square variant='outlined'>
                          <div className={"row mx-auto py-2 w-75"}>
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
                              <Typography>
                                {lesson.note}
                              </Typography>
                            </div>
                          </div>
                        </Paper>
                      </div>
                    )}
                  </Draggable>
                )
              }) : noLessons()
            }
            {provided.placeholder}
          </div>
          )}
        </Droppable>
      </DragDropContext>
      {
        modifyLessonMode && createOrUpdateLesson()
      }
      {
        COMMANDER_ROLES.includes(user.squadMember.role) &&
          <IconButton
            className={classes.buttonWithoutHover}
            onClick={
              () => setModifyLessonMode(true)
            }
          >
            <AddIcon/>
          </IconButton>
      }
    </Paper>
  )
}
