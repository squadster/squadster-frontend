import React from 'react'
import { Paper, Avatar, Typography, Chip } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import SquadMemberCardStyles from '../../assets/jss/styles/SquadMemberCard.styles' 
import { getMemberRole } from '../../helpers'
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';

const useStyles = makeStyles(SquadMemberCardStyles)

export default function SquadMemberCard(props) {
  const member = props.member
  const user = member.user
  const userName = user.firstName + ' ' + user.lastName
  const classes = useStyles()
  const showTools = props.manage && (!props.currentUser || props.currentUser.id != user.id)

  return <Paper className="position-relative" square variant='outlined'>
  <div className={"my-4 mx-auto py-2 w-75"}>
    <div className='d-flex flex-row justify-content-center justify-content-md-between'>
      <div className='d-flex flex-md-row flex-column align-items-center'>
        <Avatar alt={userName} src={user.imageUrl} className={classes.avatar} />
        <Chip className='mt-3 mb-2 d-flex d-md-none' color="primary" label={getMemberRole(member.role)}/>
        <div className='d-flex flex-column ml-md-5 ml-0 my-auto text-center text-md-left'>
          <Typography variant='subtitle1'>
            {userName}
          </Typography>
          <Typography className='mt-2' variant='subtitle1'>
            {user.mobilePhone}
          </Typography>
        </div>
      </div>
      <Chip className='d-none d-md-flex' color="primary" label={getMemberRole(member.role)}/>
      { showTools ? 
        <PersonAddDisabledIcon onClick={() => props.openDeleteModal(member)} className={classes.removeFromSquadIcon}/>
        :
        ""
      }
    </div>
  </div>
</Paper>
}