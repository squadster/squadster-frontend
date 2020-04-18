import React from 'react'
import { useSelector } from 'react-redux';
import SquadPageContent from './SquadPageContent'
import NewSquad from "../NewSquad";


export default function Squad() {
  const user = useSelector(state => state.currentUser)

  return user.squad ? <SquadPageContent /> : <NewSquad/>
}
