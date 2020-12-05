import React, { useState } from 'react'
import { Paper, Avatar, Typography, Container, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ProfileStyles from './Profile.styles'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import NotFound from 'components/App/components/shared/NotFound'
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Switch from '@material-ui/core/Switch';
import HelpIcon from '@material-ui/icons/Help';
import Popover from '@material-ui/core/Popover';
import { updateUserNotifications } from 'actions/current_user_actions';
import { useDispatch } from 'react-redux';
import { useMutation } from '@apollo/react-hooks';
import { UPDATE_NOTIFICATIONS } from 'requests'

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
  const [notifications, setNotifications] = useState({
    vk: currentUser.settings.vkNotificationsEnabled,
    telegram: currentUser.settings.telegramNotificationsEnabled,
    email: currentUser.settings.emailNotificationsEnabled
  });
  const dispatch = useDispatch();
  const [updateNotifications] = useMutation(UPDATE_NOTIFICATIONS);

  const handleChangeNotifications = (event) => {
    setNotifications({ ...notifications, [event.target.name]: event.target.checked });

    switch (event.target.name) {
      case "telegram":
        updateNotifications({ variables: { tg: event.target.checked }});
        break;
      case "vk":
        updateNotifications({ variables: { vk: event.target.checked }});
        break;
      case "email":
        updateNotifications({ variables: { email: event.target.checked }});
        break;
    }

    dispatch(updateUserNotifications(notifications));
  };
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenPopover = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

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
              {user.university ? `${user.university} ${user.faculty}` : ``}
            </Typography>
          </div>
        </div>
      </Paper>
      <Paper className={classes.root} variant='outlined'>
        <div className='d-flex flex-column flex-sm-row'>
          <div className='d-flex flex-column ml-sm-4 mt-4 mt-sm-0'>
            <Typography className={classes.profileTitle} variant='h4' component='h1'>
              Уведомления
            </Typography>
            <div className='d-flex flex-row align-items-baseline'>
              <FormControlLabel control={<Switch checked={notifications.telegram} onChange={handleChangeNotifications} name="telegram" />} label="Telegram бот"/>
              <HelpIcon fontSize='small'/>
            </div>
            <div className='d-flex flex-row align-items-baseline'>
              <FormControlLabel control={<Switch checked={notifications.vk} onChange={handleChangeNotifications} name="vk" />} label="VK бот"/>
              <HelpIcon fontSize='small'/>
            </div>
            <div className='d-flex flex-row align-items-baseline'>
              <FormControlLabel control={<Switch checked={notifications.email} onChange={handleChangeNotifications} name="email" />} label="Электронная почта"/>
              <HelpIcon aria-describedby={id} onClick={handleOpenPopover} fontSize='small'/>
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClosePopover}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
              >
                <Typography className={classes.typography}>Чтобы получать уведомления по почте, убедитесь, что вы указали и подтвердили свою почту.</Typography>
              </Popover>
            </div>
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
