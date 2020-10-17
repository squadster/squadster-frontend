import React, { useState, useEffect } from 'react'
import EmailIcon from '@material-ui/icons/Email'
import CancelScheduleSendIcon from '@material-ui/icons/CancelScheduleSend'
import { useMutation } from '@apollo/react-hooks'
import { DELETE_SQUAD_REQUEST, CREATE_SQUAD_REQUEST } from 'requests'
import { useDispatch } from 'react-redux'
import { deleteRequest, pushRequest } from 'actions/squads_actions'

function requestSent(user, requests) {
  return requests.find((request => request.user.id === user.id))
}

export default function SendRequestIcon({user, squad, setAlertState}) {
  const dispatch = useDispatch()
  const userRequest = requestSent(user, squad.requests)
  const [deleteSquadRequestQuery, { loading: deleteSquadRequestLoading, data: deleteSquadRequestData }] = useMutation(DELETE_SQUAD_REQUEST)
  const [createSquadRequestQuery, { loading: createSquadRequestLoading, data: createSquadRequestData }] = useMutation(CREATE_SQUAD_REQUEST)
  const [creationInProcess, setCreationInProcess] = useState(false)
  const [deletionInProcess, setDeletionInProcess] = useState(false)

  const cancelRequest = () => {
    setDeletionInProcess(true)
    deleteSquadRequestQuery({ variables: { id: userRequest.id } })
  }

  const sendRequest = () => {
    setCreationInProcess(true)
    createSquadRequestQuery({variables: { squadId: squad.id} })
  }

  useEffect(() => {
    if (deletionInProcess)
      if (!deleteSquadRequestLoading && deleteSquadRequestData) {
        setDeletionInProcess(false)
        dispatch(deleteRequest(squad, userRequest))
        setAlertState({ message: `Запрос на вступление в отряд ${squad.squadNumber} отменен!`, open: true})
      }
  }, [deleteSquadRequestLoading, deleteSquadRequestData, setAlertState, dispatch, userRequest, squad, deletionInProcess])

  useEffect(() => {
    if (creationInProcess)
      if (!createSquadRequestLoading && createSquadRequestData) {
        setCreationInProcess(false)
        dispatch(pushRequest(squad, {id: createSquadRequestData.createSquadRequest.id, user: {id: user.id}}))
        setAlertState({message: `Запрос на вступление в отряд ${squad.squadNumber} отправлен!`, open: true })
      }
  }, [createSquadRequestLoading, createSquadRequestData, creationInProcess, dispatch, user.id, setAlertState, squad])

 
  if (creationInProcess || deletionInProcess)
    return <div style={{width: '22px', height: '22px'}} className="spinner-border" role="status" ></div>

  return userRequest ? <div title="Отменить запрос">
    <CancelScheduleSendIcon style={{cursor: 'pointer'}} onClick={cancelRequest}/>
  </div> : <div title="Отправить запрос">
    <EmailIcon style={{cursor: 'pointer'}} onClick={sendRequest}/>
    </div>
}
