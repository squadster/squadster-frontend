import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { List, ListItem, ListItemText, TextField, InputAdornment, IconButton } from '@material-ui/core'
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentUser } from 'actions/current_user_actions'
import { Link } from 'react-router-dom'
import { VK_BOT_URL, TELEGRAM_BOT_URL } from 'static'
import CopyToClipboardButton from 'components/App/components/shared/CopyToClipboardButton'

export default function WelcomeModal() {
  const [open, setOpen] = useState(false)
  const user = useSelector(state => state.currentUser)
  const dispatch = useDispatch()

  const handleClose = () => {
    setOpen(false);
    user.showInfo = null
    dispatch(setCurrentUser(user))
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="welcome-modal-title"
        aria-describedby="welcome-modal-description"
      >
        <DialogTitle className='text-center' id="welcome-modal-title">Добро пожаловать!</DialogTitle>
        <DialogContent>
          <List>
            <ListItem>
              <ListItemText primary="- Чтобы получать уведомления через бота vk напишите ему." secondary={null} />
            </ListItem>
            <ListItem>
              <div className='d-flex flex-column'>
                <ListItemText primary="- Чтобы получать уведомления через Telegram бота отправьте ему свой ключ:" />
                <TextField
                  defaultValue={user.hashId}
                  InputProps={{
                    readOnly: true,
                    endAdornment: ( 
                      <InputAdornment position="end">
                        <CopyToClipboardButton Element={IconButton} text={user.hashId}>
                            <FileCopyOutlinedIcon />
                        </CopyToClipboardButton>
                      </InputAdornment>
                    )
                  }}
                  variant="outlined"
                />
              </div>
            </ListItem>
            <ListItem>
              <ListItemText primary="- Больше информации об уведомлениях и их настройки доступны на странице вашего профиля." />
            </ListItem>
          </List>
          <div className='px-3 d-flex flex-row justify-content-between'>
            <Link to='/profile'>
              <Button variant='contained' color='primary'>
                Мой профиль
              </Button>
            </Link>
            <a className='' href={VK_BOT_URL} rel="noopener noreferrer" target="_blank">
              <Button variant='contained' color='primary'>
                VK бот
              </Button>
            </a>
            <a className='' href={TELEGRAM_BOT_URL} rel="noopener noreferrer" target="_blank">
              <Button variant='contained' color='primary'>
                Telegram бот
              </Button>
            </a>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} className='my-4 mx-auto' variant='contained' color='default'>
            Ок
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
