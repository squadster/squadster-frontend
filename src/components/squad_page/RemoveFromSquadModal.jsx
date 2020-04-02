import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContentText, DialogContent, DialogTitle } from '@material-ui/core';


export default function SquadMemberCard(props) {
  const user = props.user

  return  <Dialog
            open={props.open}
            onClose={() => props.handleClose(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
  <DialogTitle id="alert-dialog-title">Нужно подтверждение!</DialogTitle>
  <DialogContent>
    <DialogContentText id="alert-dialog-description">
      Вы уверены что хотите исключить пользователя {user && user.firstName} {user && user.lastName}
    </DialogContentText>
  </DialogContent>
  <DialogActions>
    <Button onClick={() => props.handleClose(true)} variant='contained' color="secondary">
      Да
    </Button>
    <Button onClick={() => props.handleClose(false)} variant='text' color="primary" autoFocus>
      Нет
    </Button>
  </DialogActions>
</Dialog>
}