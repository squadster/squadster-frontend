import React, { useState } from 'react'
import { Typography, Paper, TextField, Button } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import { useDispatch } from 'react-redux'
import { useMutation } from '@apollo/react-hooks'
import { UPDATE_NUMBER } from 'requests'
import { updateSquadNumber } from 'actions'

export default function SquadNumber(props) {
  const user = props.user;
  const manage = user.role !== 'student';

  const [editMode, setEditMode] = useState(false);
  const [number, setNumber] = useState(user.squad.squadNumber);
  const dispatch = useDispatch();
  const [updateNumber] = useMutation(UPDATE_NUMBER);

  return(
    <div style={{display: 'flex'}}>
      {editMode ?
        <div className="d-flex flex-column">
          <TextField
            multiline
            value={number}
            className='w-100'
            onChange={(e) => setNumber(e.target.value)}
            variant="outlined"
          />
          <Button onClick={() => {
              updateNumber({ variables: { number: number, id: user.squad.id }})
              dispatch(updateSquadNumber(number))
              setEditMode(false)
            }}
            className="mt-2"
            color="primary">
            Сохранить
          </Button>
          </div> :
          <Typography variant='h4' className={props.classes.squadTitle} component='h1'>
            Взвод № {number}
          </Typography>
      }
      {
        manage ?
        <div title="Изменить">
          <EditIcon
            onClick={() => setEditMode(!editMode)}
            style={{cursor: 'pointer'}}
          />
        </div>
        : ""
      }
    </div>
  );
}
