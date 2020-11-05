import React from 'react'
import { Paper, Avatar, Typography, Container, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ProfileStyles from './Profile.styles'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import NotFound from 'components/App/components/shared/NotFound'

const useStyles = makeStyles(ProfileStyles)

function findColleague(currentUser, user_id) {
  if (currentUser.squad) {
    const member = currentUser.squad.members.find((member) => member.user.id === user_id)
    if (member) {
      return member.user
    }
  }
}

export default function Profile() {
  const classes = useStyles();
  const currentUser = useSelector(state => state.currentUser)
  const userId = useParams().id
  const user = userId ? findColleague(currentUser, userId) : currentUser

  if (!user)
    return <NotFound />

  return (
    <Container>
      <Paper className={classes.root} variant='outlined'>
        <div className='d-flex flex-column flex-sm-row'>
          <Avatar
            alt={user.id}
            src={user.imageUrl}
            className={classes.avatar}
          />
          <div className='d-flex flex-column ml-sm-4 mt-4 mt-sm-0'>
            <Typography className={classes.profileTitle} variant='h4' component='h1'>
              {`${user.firstName} ${user.lastName}`}
            </Typography>
            <Typography className={classes.profileText} variant='h6' component='h2'>
              {user.birthDate}
              <br/>
              {user.mobilePhone}
              <br/>
              {`${user.university} ${user.faculty}`}
            </Typography>
          </div>
        </div>
      </Paper>
      <Link className='d-flex justify-content-center' to='/'>
        <Button variant='contained' color='primary' className='mt-4 color-white'>
          Назад
        </Button>
      </Link>
    </Container>
  );
}
