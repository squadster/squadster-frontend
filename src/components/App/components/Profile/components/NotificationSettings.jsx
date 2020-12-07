import React, { useState } from 'react';
import { Paper, Typography, FormControlLabel, Switch, TextField, Button, Tooltip, ClickAwayListener } from '@material-ui/core';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core';
import { useMutation } from '@apollo/react-hooks';
import { UPDATE_NOTIFICATIONS } from 'requests';
import { useDispatch } from 'react-redux';
import { updateUserNotifications } from 'actions/current_user_actions';
import HelpIcon from '@material-ui/icons/Help';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import FileCopyIcon from '@material-ui/icons/FileCopy';

export default function NotificationSettings(props) {
  const classes = props.classes;
  const currentUser = props.user;

  const [notifications, setNotifications] = useState({
    vk: currentUser.settings.vkNotificationsEnabled,
    telegram: currentUser.settings.telegramNotificationsEnabled,
    email: currentUser.settings.emailNotificationsEnabled
  });
  const [openVkPopup, setOpenVkPopup] = useState(false);
  const [openTelegramPopup, setOpenTelegramPopup] = useState(false);
  const [openEmailPopup, setOpenEmailPopup] = useState(false);
  const [openTooltip, setOpenTooltip] = useState(false);

  const [updateNotifications] = useMutation(UPDATE_NOTIFICATIONS);

  const dispatch = useDispatch();

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
      default:
        break;
    }

    dispatch(updateUserNotifications(notifications));
  };

  const handleCloseVkPopup = () => {
    setOpenVkPopup(false);
  };

  const handleClickOpenVkPopup = () => {
    setOpenVkPopup(true);
  };

  const handleClickOpenTeleramPopup = () => {
    setOpenTelegramPopup(true);
  };

  const handleCloseTelegramPopup = () => {
    setOpenTelegramPopup(false);
  };

  const handleCloseEmailPopup = () => {
    setOpenEmailPopup(false);
  };

  const handleOpenEmailPopup = () => {
    setOpenEmailPopup(true);
  };

  const openVkGroup = () => {
    window.open('https://vk.com/club183369373','_blank');
  };

  const openTGBot = () => {
    window.open('https://t.me/squadsterbot','_blank');
  };

  const handleTooltipClose = () => {
    setOpenTooltip(false);
  };

  const handleCopyTooltip = () => {
    setOpenTooltip(true);
  };

  return(
    <Paper className={classes.root} variant='outlined'>
      <div className='d-flex flex-column flex-sm-row'>
        <div className='d-flex flex-column ml-sm-4 mt-4 mt-sm-0'>
          <Typography className={classes.profileTitle} variant='h4' component='h1'>
            Уведомления
          </Typography>
          <div className='d-flex flex-row align-items-baseline'>
            <FormControlLabel control={<Switch checked={notifications.telegram} onChange={handleChangeNotifications} name="telegram" />} label="Telegram бот"/>
            <HelpIcon fontSize='small' style={{cursor:'pointer'}} onClick={handleClickOpenTeleramPopup}/>
            <Dialog open={openTelegramPopup} onClose={handleCloseTelegramPopup} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Telegram бот</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Чтобы бот имел возможность отправлять вам уведомления отправьте ему свой ключ:
                </DialogContentText>
                <div className='d-flex align-items-center'>
                  <TextField
                    id="outlined-read-only-input"
                    label="Ключ"
                    defaultValue={currentUser.hashId}
                    InputProps={{
                      readOnly: true,
                    }}
                    variant="outlined"
                    style={{width:'472px'}}
                  />
                  <ClickAwayListener onClickAway={handleTooltipClose}>
                    <Tooltip
                      PopperProps={{
                        disablePortal: true,
                      }}
                      onClose={handleTooltipClose}
                      open={openTooltip}
                      disableFocusListener
                      disableHoverListener
                      disableTouchListener
                      title="Скопировано"
                    >
                      <CopyToClipboard text={currentUser.hashId} onCopy={handleCopyTooltip}>
                        <FileCopyIcon style={{cursor: 'pointer', marginLeft: '13px'}} />
                      </CopyToClipboard>
                    </Tooltip>
                  </ClickAwayListener>
                </div>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseTelegramPopup} color="primary">
                  Ок
                </Button>
                <Button onClick={openTGBot} color="primary">
                  Перейти к боту
                </Button>
              </DialogActions>
            </Dialog>
          </div>
          <div className='d-flex flex-row align-items-baseline'>
            <FormControlLabel control={<Switch checked={notifications.vk} onChange={handleChangeNotifications} name="vk" />} label="VK бот"/>
            <HelpIcon fontSize='small' onClick={handleClickOpenVkPopup} style={{cursor:'pointer'}}/>
            <Dialog
              open={openVkPopup}
              onClose={handleCloseVkPopup}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">{"ВК бот"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Чтобы бот мог отправлять вам уведомления напишите ему.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseVkPopup} color="primary">
                  Ок
                </Button>
                <Button onClick={openVkGroup} color="primary" autoFocus>
                  Перейти к боту
                </Button>
              </DialogActions>
            </Dialog>
          </div>
          <div className='d-flex flex-row align-items-baseline'>
            <FormControlLabel control={<Switch checked={notifications.email} onChange={handleChangeNotifications} name="email" />} label="Электронная почта"/>
            <HelpIcon onClick={handleOpenEmailPopup} fontSize='small' style={{cursor:'pointer'}}/>
            <Dialog
              open={openEmailPopup}
              onClose={handleCloseEmailPopup}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">{"Уведомления по электронной почте"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                Чтобы получать уведомления по почте, убедитесь, что вы указали и подтвердили свою почту.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseEmailPopup} color="primary">
                  Ок
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
      </div>
    </Paper>
  );
};
