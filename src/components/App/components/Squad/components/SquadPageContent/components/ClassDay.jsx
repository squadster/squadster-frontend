import React, { useState } from 'react'
import EditIcon from '@material-ui/icons/Edit'
import { Typography, Paper, Button, Select, MenuItem } from '@material-ui/core'
import { useMutation } from '@apollo/react-hooks'
import { UPDATE_CLASS_DAY } from 'requests'
import { useDispatch } from 'react-redux'
import { updateSquadClassDay } from 'actions/current_user_actions'
import { getWeekDayNumber, getWeekDayByNumber } from 'helpers'
import { makeStyles } from '@material-ui/core/styles';
import SquadsStyles from '../../../../NewSquad/NewSquad.styles';

const useStyles = makeStyles(SquadsStyles);

export default function ClassDay(props) {
  const user = props.user

  const classes = useStyles();
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false)
  const [classDay, setClassDay] = useState(getWeekDayNumber(user.squad.classDay) || "")
  const [updateClassDay] = useMutation(UPDATE_CLASS_DAY)

  return <Paper className={'py-3 px-4 mt-3'} square>
      <div className='d-flex flex-row justify-content-between mb-2'>
        <Typography variant='h5'>
          День занятий:
        </Typography>
        {
          props.manage ?
          <div title="Изменить">
            <EditIcon
              onClick={() => setEditMode(!editMode)}
              style={{cursor: 'pointer'}}
            />
          </div>
          : ""
        }
      </div>
      {editMode ?
      <div className="d-flex flex-column">
        <Select
          classes={{
            root: classes.selectRoot,
          }}
          value={classDay}
          onChange={e => setClassDay(e.target.value)}
          id='day-native-simple'
        >
          <MenuItem value={1}>Понедельник</MenuItem>
          <MenuItem value={2}>Вторник</MenuItem>
          <MenuItem value={3}>Среда</MenuItem>
          <MenuItem value={4}>Четверг</MenuItem>
          <MenuItem value={5}>Пятница</MenuItem>
          <MenuItem value={6}>Суббота</MenuItem>
        </Select>
       {/* <TextField
          multiline
          value={classDay}
          className='w-100'
          onChange={(e) => setClassDay(e.target.value)}
          variant="outlined"
        /> */}
        <Button onClick={() => {
            updateClassDay({ variables: { classDay: classDay, id: user.squad.id }})
            dispatch(updateSquadClassDay(classDay))
            setEditMode(false)
          }}
          className="mt-2"
          color="primary">
          Сохранить
        </Button>
        </div> :
        <Typography variant='body1'>
          { getWeekDayByNumber(classDay) || 'День занятий еще не назначен' }
        </Typography>
      }
    </Paper>
}
