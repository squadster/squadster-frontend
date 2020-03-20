import React from 'react'
import { Paper, Avatar, Typography, Chip } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import SquadMemberCardStyles from '../../assets/jss/styles/SquadMemberCard.styles' 
import { getMemberRole } from '../../helpers'

const useStyles = makeStyles(SquadMemberCardStyles)

export default function SquadMemberCard(props) {
  const member = props.member
  const user = member.user
  const userName = user.firstName + ' ' + user.lastName
  const classes = useStyles()

  return <Paper square variant='outlined'>
  <div className='my-4 w-75 mx-auto py-2'>
    <div className='position-relative d-flex flex-row justify-content-between'>
      <div className='d-flex flex-md-row  flex-column'>
        <Avatar alt={userName} src={user.imageUrl} className={classes.avatar} />
        <div className='d-flex flex-column ml-5 my-auto text-left'>
          <Typography variant='subtitle1'>
            {userName}
          </Typography>
          <Typography className='mt-2' variant='subtitle1'>
            {user.mobilePhone}
          </Typography>
        </div>
      </div>
      <Chip color="primary" label={getMemberRole(member.role)}/>
    </div>
  </div>
</Paper>
}