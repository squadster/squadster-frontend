import React from 'react'
import CommanderSquadConfig from './components/CommanderSquadConfig/CommanderSquadConfig'
import MemberSquadConfig from './components/MemberSquadConfig'
import SendRequestIcon from './components/SendRequestIcon'
import { TableCell, TableRow } from '@material-ui/core'

const commanderName = (squad) => {
  let commander = squad.members.find((m) => m.role === 'commander');
  return commander ? `${commander.user.lastName} ${commander.user.firstName}` : '';
}

export default function SquadRecord({user, squad, deleteRequest, pushRequest, setAlertState}) {
  const isUsersSquad = user.squad.id === squad.id
  const isUserCommander = user.squadMember.role === 'commander'

  return <TableRow>
    <TableCell>{squad.squadNumber}</TableCell>
    <TableCell>{commanderName(squad)}</TableCell>
    <TableCell>
    {
      !user.squad &&
        <SendRequestIcon setAlertState={setAlertState}
                         deleteRequest={deleteRequest}
                         pushRequest={pushRequest}
                         squad={squad}
                         user={user} />
     
    }
    {
     isUsersSquad && (isUserCommander ? <CommanderSquadConfig squad={squad} /> : <MemberSquadConfig squad={squad}/>)
    }
    </TableCell>
  </TableRow>
}
