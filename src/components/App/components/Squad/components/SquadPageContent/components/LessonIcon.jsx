import React from 'react'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import SquadsStyles from './Schedule/Schedule.style';
import { lessonTypeFormatter } from '../../../../../../../helpers/index'

const useStyles = makeStyles(SquadsStyles);

export default function LessonIcon(props) {
  const lessonType = props.lessonType;
  const classes = useStyles();
  const format = lessonTypeFormatter(lessonType);

  return (
    <div className={classes.avatarBorder} style={{backgroundColor: format.color}}>
      <Typography className={classes.lessonType}>
        {format.name}
      </Typography>
    </div>
  )
}
