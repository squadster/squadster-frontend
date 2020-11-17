import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { List, ListItem, ListItemText, TextField } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentUser } from 'actions/current_user_actions'
import { Link } from 'react-router-dom'

export default function WelcomeModal() {
  const [open, setOpen] = useState(true)
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
                  }}
                  variant="outlined"
                />
              </div>
            </ListItem>
            <ListItem>
              <ListItemText primary="- Больше информации об уведомлениях и их настройки доступны на странице вашего профиля." />
            </ListItem>
          </List>
          <div className='pl-3 d-flex flex-column'>
            <Link to='/profile'>
              Мой профиль
            </Link>
            <a className='mt-2' href='https://vk.com/club183369373' rel="noopener noreferrer" target="_blank">
              VK бот
            </a>
            <a className='mt-2' href='https://t.me/squadsterbot'  rel="noopener noreferrer" target="_blank">
              TG бот
            </a>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Ок
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
