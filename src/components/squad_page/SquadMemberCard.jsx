import React from 'react'
import { Paper, Avatar, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import SquadMemberCardStyles from '../../assets/jss/styles/SquadMemberCard.styles' 
import { getMemberRole } from '../../helpers'

const useStyles = makeStyles(SquadMemberCardStyles)

export default function SquadMemberCard(props) {
  const member = props.member
  const user = member.user
  const userName = user.firstName + ' ' + user.lastName
  const classes = useStyles()

  return <div className='my-4 w-75 mx-auto py-2'>
    <div className='d-flex flex-row'>
      <Avatar alt={userName} src={user.imageUrl} className={classes.avatar} />
      <div className='d-flex flex-column ml-5'>
        <Typography variant='subtitle1'>
          {getMemberRole(member.role)} {userName}
        </Typography>
      </div>
    </div>
  </div>

}