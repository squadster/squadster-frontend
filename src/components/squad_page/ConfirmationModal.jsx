import React from 'react';
import { Button, Dialog, DialogActions, DialogContentText, DialogContent, DialogTitle } from '@material-ui/core';


export default function ConfirmationModal(props) {
  const handleClose = props.options.handleClose

  return  <Dialog
            open={props.open}
            onClose={() => handleClose(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
  <DialogTitle id="alert-dialog-title">Нужно подтверждение!</DialogTitle>
  <DialogContent>
    <DialogContentText id="alert-dialog-description">
      {props.options.message}
    </DialogContentText>
  </DialogContent>
  <DialogActions>
    <Button onClick={() => handleClose(true)} variant='contained' color="secondary">
      Да
    </Button>
    <Button onClick={() => handleClose(false)} variant='text' color="primary" autoFocus>
      Нет
    </Button>
  </DialogActions>
</Dialog>
}