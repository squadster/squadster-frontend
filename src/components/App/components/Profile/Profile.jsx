import React from 'react'
import { Paper, Avatar, Typography, Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ProfileStyles from './Profile.styles'
import { useSelector } from 'react-redux'

const useStyles = makeStyles(ProfileStyles)

export default function Profile(props) {  const classes = useStyles();
  const currentUser = useSelector(state => state.currentUser);

  return (
    <Container>
      <Paper className={classes.root} variant='outlined'>
        <div className='d-flex flex-column flex-sm-row'>
          <Avatar
            alt={currentUser.id}
            src={currentUser.imageUrl}
            className={classes.avatar}
          />
          <div className='d-flex flex-column ml-sm-4 mt-4 mt-sm-0'>
            <Typography className={classes.profileTitle} variant='h4' component='h1'>
              {`${currentUser.firstName} ${currentUser.lastName}`}
            </Typography>
            <Typography className={classes.profileText} variant='h6' component='h2'>
              {currentUser.birthDate}
              <br/>
              {currentUser.mobilePhone}
              <br/>
              {`${currentUser.university} ${currentUser.faculty}`}
            </Typography>
          </div>
        </div>
      </Paper>
    </Container>
  );
}
