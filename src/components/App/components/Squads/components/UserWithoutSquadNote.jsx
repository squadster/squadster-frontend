import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Paper, Typography } from '@material-ui/core'
import SquadsStyles from '../Squads.styles'

const useStyles = makeStyles(SquadsStyles);

export default function UserWithoutSquadNote() {
  const classes = useStyles();

  return (
    <Paper className="p-3 mt-4">
      <div className='row'>
        <div className='col-sm-10'>
          <Typography variant='h5' className={classes.typography}>
            Вы пока не вступили во взвод, создайте новый взвод или отправьте заявку в существующий!
          </Typography>
        </div>
      </div>
    </Paper>
  )
}
