import React, { useState } from 'react'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Container, Typography, Paper, ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary } from '@material-ui/core';
import { getWeekDay } from '../../helpers'
import SquadMemberCard from './SquadMemberCard'
import Advertisment from './Advertisment'


function filterMembers(members, roles) {
  return members.filter((member) => {
    return roles.includes(member.role) 
  })
}

function noMembers(currentUser) {
  return <div className='d-flex flex-column text-center py-4'>
    <Typography variant='subtitle1'>
      Во взводе пока нет членов с такими ролями
    </Typography>
    { currentUser.role === 'commander' || currentUser.role === 'deputy_commander' ?
      <Typography variant='subtitle2'>
        Не забывайте обновлять роли членов взвода а также отсылайте приглашения
      </Typography> : "" }
  </div>
}

export default function SquadPageContent(props) {
  const [expanded, setExpanded] = useState(false)
  const user = props.user

  const handleExpandChange = (event, newValue) => {
    setExpanded(newValue)
  }

  const commanders = filterMembers(user.squad.members, ['commander', 'deputy_commander', 'journalist'])
  const members = filterMembers(user.squad.members, ['student'])
  
  
  return <Paper style={{minHeight: '90vh'}}>
  <Container className='d-flex flex-column'>
    <div className={'d-flex flex-column flex-lg-row justify-content-lg-between justify-content-center'}>
      <Typography className='pt-4 mr-lg-3 align-self-center align-self-lg-left' variant='h4' component='h1' style={{fontSize: '28px'}}>
        Взвод № {user.squad.squadNumber}
      </Typography>
      <ExpansionPanel className='mt-4' expanded={expanded} onChange={handleExpandChange}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className='mx-auto' variant='subtitle1' component='p'>
            Показать дополнительную информацию
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className='d-flex flex-column'>
          <div className='d-flex flex-column flex-sm-row mt-3 mt-sm-0'>
            <Typography style={{minWidth: '150px'}} className='font-weight-bold d-flex align-items-center' variant='body1' component='h3'>
              Университет:
            </Typography>
            <Typography variant='body1' className='d-flex align-items-center' component='p'>
              {user.university}
            </Typography>
          </div>
          <div className='d-flex flex-column flex-sm-row mt-3 mt-sm-0'>
            <Typography style={{minWidth: '150px'}} className='font-weight-bold d-flex align-items-center' variant='body1' component='h3'>
              Факультет:
            </Typography>
            <Typography variant='body1' className='d-flex align-items-center' component='p'>
              {user.faculty}
            </Typography>
          </div>
          <div className='d-flex flex-column flex-sm-row mt-3 mt-sm-0'>
            <Typography style={{minWidth: '150px'}} className='font-weight-bold d-flex align-items-center' variant='body1' component='h3'>
              Классный день:
            </Typography>
            <Typography variant='body1' className='d-flex align-items-center' component='p'>
              {getWeekDay(user.squad.classDay)}
            </Typography>
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
    <Advertisment user={user}/>
    <Paper className={'d-flex flex-column mt-5'} square variant="outlined" style={{minHeight: '500px'}}>
      <div className='d-flex flex-column'> 
        <Typography variant='h4' className='my-4 text-center'>
          <b>Командный состав</b>
        </Typography>
        { commanders.length ? commanders.map((member, index) => {
          return <SquadMemberCard key={index} member={member}/>  
        }) : noMembers(user) }
      </div>
      <div className='d-flex flex-column'> 
        <Typography variant='h4' className='my-4 text-center'>
          <b>Состав</b>
        </Typography>
        { members.length ? members.map((member, index) => {
          return <SquadMemberCard key={index} member={member}/>  
        }) : noMembers(user) }
      </div>
    </Paper>
  </Container>
</Paper> 
}