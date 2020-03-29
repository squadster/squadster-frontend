import React from 'react'
import { useSelector } from 'react-redux';
import { Container, Typography, Paper, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SquadStyles from '../../assets/jss/styles/squad_page/Squad.styles'
import SquadPageContent from './SquadPageContent'


export default function Squad() {
  const user = useSelector(state => state.currentUser)
  const classes = useStyles()

  return user.squad ? <SquadPageContent /> : squadPageEmpty(classes)
}
