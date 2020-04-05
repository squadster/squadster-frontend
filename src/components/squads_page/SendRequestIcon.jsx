import React, { useState } from 'react'
import SendIcon from '@material-ui/icons/Send'
import CancelScheduleSendIcon from '@material-ui/icons/CancelScheduleSend'
import { useMutation } from '@apollo/react-hooks'
import { DELETE_SQUAD_REQUEST, CREATE_SQUAD_REQUEST } from '../../requests'

function requestSent(user, requests) {
  return requests.find((request => request.user.id = user.id))
}

export default function SendRequestIcon({user, squad, alertState}) {
  const request = requestSent(user, squad.request)
  const [deleteSquadRequestQuery, { data1 }] = useMutation(DELETE_SQUAD_REQUEST)
  const [createSquadRequestQuery, { data2 }] = useMutation(CREATE_SQUAD_REQUEST)
  
  const cancelRequest = () => {
    deleteSquadRequestQuery({ variables: { id: request.id } })
    squad.requests = squad.requests.filer((request => request !== request))
    alertState.message = `Запрос на вступление в отряд ${squad.number} отменен!`
    alertState.open = true
  }

  const sendRequest = () => {
    createSquadRequestQuery({variables: { squadId: squad.id} })
    squad.requests.push({id: data2.id, user: {id: user.id}})
    alertState.message = `Запрос на вступление в отряд ${squad.number} отправлен!`
    alertState.open = true
  }

  return request ? <CancelScheduleSendIcon onClick={cancelRequest}/> : <SendIcon onClick={sendRequest}/>
}