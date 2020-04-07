import React, { useState, useEffect } from 'react'
import EmailIcon from '@material-ui/icons/Email';
import CancelScheduleSendIcon from '@material-ui/icons/CancelScheduleSend'
import { useMutation } from '@apollo/react-hooks'
import { DELETE_SQUAD_REQUEST, CREATE_SQUAD_REQUEST } from '../../requests'

function requestSent(user, requests) {
  return requests.find((request => request.user.id = user.id))
}

export default function SendRequestIcon({user, squad, setAlertState, deleteRequest, pushRequest}) {
  const userRequest = requestSent(user, squad.requests)
  const [deleteSquadRequestQuery, { loading: deleteSquadRequestLoading, data: deleteSquadRequestData }] = useMutation(DELETE_SQUAD_REQUEST)
  const [createSquadRequestQuery, { loading: createSquadRequestLoading, data: createSquadRequestData }] = useMutation(CREATE_SQUAD_REQUEST)
  const [inProcess, setInProcess] = useState(false)

  const cancelRequest = () => {
    setInProcess(true)
    deleteSquadRequestQuery({ variables: { id: userRequest.id } })
  }

  const sendRequest = () => {
    setInProcess(true)
    createSquadRequestQuery({variables: { squadId: squad.id} })
  }

  useEffect(() => {
    if (inProcess)
      if (!deleteSquadRequestLoading && deleteSquadRequestData) {
        setInProcess(false)
        deleteRequest(squad, userRequest)
        setAlertState({ message: `Запрос на вступление в отряд ${squad.squadNumber} отменен!`, open: true})
      }
  }, [deleteSquadRequestLoading, deleteSquadRequestData])

  useEffect(() => {
    if (inProcess)
      if (!createSquadRequestLoading && createSquadRequestData) {
        setInProcess(false)
        pushRequest(squad, {id: createSquadRequestData.createSquadRequest.id, user: {id: user.id}})
        setAlertState({message: `Запрос на вступление в отряд ${squad.squadNumber} отправлен!`, open: true })
      }
  }, [createSquadRequestLoading, createSquadRequestData])

 
  if (inProcess)
    return <div style={{width: '22px', height: '22px'}} className="spinner-border" role="status" ></div>

  return userRequest ? <div title="Отменить запрос">
    <CancelScheduleSendIcon style={{cursor: 'pointer'}} onClick={cancelRequest}/>
  </div> : <div title="Отправить запрос">
    <EmailIcon style={{cursor: 'pointer'}} onClick={sendRequest}/>
    </div>
}