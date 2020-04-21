import React from 'react'
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import SquadPageContent from './SquadPageContent'


export default function Squad() {
  const user = useSelector(state => state.currentUser)
    return user.squad ? <SquadPageContent /> : <Redirect to='/new_squad'/>
}
