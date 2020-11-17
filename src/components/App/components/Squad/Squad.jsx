import React from 'react'
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import SquadPageContent from './components/SquadPageContent/SquadPageContent'
import WelcomeModal from '../WelcomeModal/WelcomeModal'

export default function Squad() {
  const user = useSelector(state => state.currentUser)
    
  if (user.squad) {
    return <>
      <SquadPageContent />
      { user.showInfo && <WelcomeModal />}
    </> 
  } else {
    return <Redirect to='/new_squad'/>
  }
}
