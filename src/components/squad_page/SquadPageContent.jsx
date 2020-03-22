import React, { useState } from 'react'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Container, Typography, Paper, Tabs, Tab, ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary } from '@material-ui/core';
import { getWeekDay } from '../../helpers'
import SquadMemberCard from './SquadMemberCard'
import { isMobile } from '../../helpers'


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
    { currentUser.role == 'commander' || currentUser.role == 'deputy_commander' ?
      <Typography variant='subtitle2'>
        Не забывайте обновлять роли членов взвода а также отсылайте приглашения
      </Typography> : "" }
  </div>
}

export default function SquadPageContent(props) {
  const [tabIndex, setTabIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const user = props.user
  
  const handleTabsChange = (event, newValue) => {
    setTabIndex(newValue);
  };
  const handleExpandChange = (event, newValue) => {
    setExpanded(newValue)
  }

  const commanders = filterMembers(user.squad.members, ['commander', 'deputy_commander', 'journalist'])
  const members = filterMembers(user.squad.members, ['student'])
  
  
  return <Paper style={{minHeight: '90vh'}}>
  <Container className='d-flex flex-column'>
    <div className={'d-flex flex-column flex-xl-row justify-content-xl-between justify-content-center mx-auto ' + (isMobile ? 'w-100' : 'w-75')}>
      <Typography className='pt-4 mr-xl-3 align-self-center align-self-xl-left' variant='h4' component='h1' style={{fontSize: '28px'}}>
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
    <Paper className={'py-3 px-4 mt-5 mx-auto ' + (isMobile ? 'w-100' : 'w-75')} square>
      <Typography variant='h5'>
        Oбъявление:
      </Typography>
      <Typography variant='body1'>
        {user.squad.advertisment}
      </Typography>
    </Paper> 
    <Paper className={'d-flex flex-column mx-auto mt-5 ' + (isMobile ? 'w-100' : 'w-75')} square variant="outlined" style={{minHeight: '500px'}}>
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