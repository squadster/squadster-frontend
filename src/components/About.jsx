import React from "react"
import { Card, CardContent, Container, Typography } from '@material-ui/core'

export default function About() {
  return <Container maxWidth='sm'>
    <Card style={{marginTop: '200px'}}>
      <CardContent>
        <Typography variant="h6" component="h2">
          Создано командой разработчиков Squadster
        </Typography>
        <Typography className='mt-3' variant="body2" component="p">
          GitHub репозиторий - <a href='https://github.com/squadster'>https://github.com/squadster</a>
        </Typography>
        <Typography variant="body2" component="p">
          Написать в поддержку - <a href='mail:to artoriousso@gmail.com'>artoriousso@gmail.com</a>
        </Typography>
      </CardContent>
    </Card>
  </Container>
 }
