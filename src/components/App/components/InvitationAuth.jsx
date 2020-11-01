import React, { useEffect } from 'react'
import Spinner from './shared/Spinner'
import { API_URL } from 'static'
import { useParams } from 'react-router-dom'
import { logout } from 'helpers'
import { useDispatch } from 'react-redux'

export default function InvitationAuth() {
  const dispatch = useDispatch()
  const { hash_id } = useParams()
  const redirectUrl = `${API_URL}/api/auth/vk?state=${encodeURIComponent(`hash_id=${hash_id}`)}`

  useEffect(() => {
    logout(dispatch)
    window.location.href = redirectUrl
  }, [redirectUrl, dispatch])

  return <Spinner />
}
