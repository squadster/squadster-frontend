import React from 'react'
import { Typography, Paper, TextField, Button } from '@material-ui/core'

export default function SquadNumber(props) {
  return(
    <Typography variant='h4' className={props.classes.squadTitle} component='h1'>
      Взвод № {props.user.squad.squadNumber}
    </Typography>
  );
}
