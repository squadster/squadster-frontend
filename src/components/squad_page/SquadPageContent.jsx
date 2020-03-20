import React, { useState } from 'react'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Container, Typography, Paper, Tabs, Tab, ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary } from '@material-ui/core';
import { getWeekDay } from '../../helpers'
import SquadMemberCard from './SquadMemberCard'


function filterMembers(members, filterCriteria) {
  switch (filterCriteria) {
    case 0:
      return members
    case 1:
      return members.filter((member) => {
        return member.role === 'commander' || member.role === 'deputy_commander'
      })
    case 2:
      return members.filter((member) => {
        return member.role === 'journalist'
      })
    case 3:
      return members.filter((member) => {
        return member.role === 'student'
      })
    default:
      return []
  }
}

function noMembers(currentUser) {
  return <div className='d-flex flex-column text-center' style={{marginTop: '20%'}}>
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

  const shownMembers = filterMembers(user.squad.members, tabIndex)
  
  return <Paper style={{minHeight: '90vh'}}>
  <Container className='d-flex flex-column'>
    <div className='w-75 d-flex flex-column flex-xl-row justify-content-xl-between justify-content-center mx-auto'>
      <Typography className='mb-auto pt-4 mr-xl-3 align-self-center align-self-xl-left' variant='h4' component='h1' style={{fontSize: '30px'}}>
        Взвод № {user.squad.squadNumber}
      </Typography>
      <ExpansionPanel className='mt-4' expanded={expanded} onChange={handleExpandChange}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className='mx-auto' variant='subtitle1' component='p'>
            Показать дополнительную информацию
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className='d-flex flex-row'>
          <div className='d-flex flex-column'>
            <Typography className='font-weight-bold' variant='body1' component='h3'>
              Университет:
            </Typography>
            <Typography className='font-weight-bold' variant='body1' component='h3'>
              Факультет:
            </Typography>
            <Typography className='font-weight-bold' variant='body1' component='h3'>
              Классный день:
            </Typography>
          </div>
          <div className='d-flex flex-column'>
            <Typography variant='body1' className='d-flex align-items-center ml-3' component='p'>
              {user.university}
            </Typography>
            <Typography variant='body1' className='d-flex align-items-center ml-3' component='p'>
              {user.faculty}
            </Typography>
            <Typography variant='body1' className='d-flex align-items-center ml-3' component='p'>
              {getWeekDay(user.squad.classDay)}
            </Typography>
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
    <Paper className='py-3 px-4 w-75 mt-5 mx-auto' square>
      <Typography variant='h5'>
        Oбъявление:
      </Typography>
      <Typography variant='body1'>
        {user.squad.advertisment}
      </Typography>
    </Paper> 
    <Paper className='mx-auto w-75 mt-5' square variant="outlined" style={{minHeight: '500px'}}>
      <Tabs value={tabIndex}
            indicatorColor="primary"
            textColor="primary"
            onChange={handleTabsChange}>
        <Tab className='px-3' label="Все члены взвода"  />
        <Tab className='px-3' label="Командный состав"  />
        <Tab className='px-3' label="Журналисты"  />
        <Tab className='px-3' label="Студенты" />
      </Tabs>
      { shownMembers.length ? shownMembers.map((member, index) => {
        return <SquadMemberCard key={index} member={member}/>  
      }) : noMembers(user)}
    </Paper>
  </Container>
</Paper> 
}