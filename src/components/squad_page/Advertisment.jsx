import React, { useState } from 'react'
import EditIcon from '@material-ui/icons/Edit'
import { Typography, Paper, TextField, Button } from '@material-ui/core'
import { useMutation } from '@apollo/react-hooks'
import { UPDATE_ADVERTISMENT } from '../../requests'
import { useDispatch } from 'react-redux'
import { updateSquadAdvertisment } from '../../actions'

export default function Advertisment(props) {
  const user = props.user

  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false)
  const [advertisment, setAdvertisment] = useState(user.squad.advertisment || "")
  const [updateAdvertisment, { data }] = useMutation(UPDATE_ADVERTISMENT)

  return <Paper className={'py-3 px-4 mt-5'} square>
      <div className='d-flex flex-row justify-content-between mb-2'>
        <Typography variant='h5'>
          Oбъявление:
        </Typography>
        { 
          props.manage ? 
          <div title="Изменить">
            <EditIcon onClick={() => setEditMode(!editMode)}></EditIcon>
          </div> 
          : ""
        }
      </div>
      {editMode ?
      <div className="d-flex flex-column">
       <TextField
          multiline
          value={advertisment}
          className='w-100'
          onChange={(e) => setAdvertisment(e.target.value)}
          variant="outlined"
        />
        <Button onClick={() => {
            updateAdvertisment({ variables: { advertisment: advertisment, id: user.squad.id }})
            dispatch(updateSquadAdvertisment(advertisment))
            setEditMode(false)
          }}
          className="mt-2"
          color="primary">
          Сохранить
        </Button>
        </div> :
        <Typography variant='body1'>
          {advertisment && advertisment.length ? advertisment : "Ничего здесь, пока что"}
        </Typography>
      }
    </Paper> 
}