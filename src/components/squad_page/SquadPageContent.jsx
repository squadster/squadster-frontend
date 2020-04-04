import React, { useState } from 'react'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Container, Typography, Paper, ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary } from '@material-ui/core'
import { getWeekDay, inCommandSquad } from '../../helpers'
import SquadMemberCard from './SquadMemberCard'
import Advertisment from './Advertisment'
import GroupAddIcon from '@material-ui/icons/GroupAdd'
import { makeStyles } from '@material-ui/core/styles'
import RemoveFromSquadModal from './RemoveFromSquadModal'
import SquadPageContentStyles from '../../assets/jss/styles/squad_page/SquadPageContentStyles.styles'
import { useDispatch } from 'react-redux'
import { useMutation } from '@apollo/react-hooks'
import { deleteSquadMember } from '../../actions'
import { DELETE_SQUAD_MEMBER } from '../../requests'

const useStyles = makeStyles(SquadPageContentStyles)

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
  const dispatch = useDispatch()
  const [deleteSquadMemberQuery, { data }] = useMutation(DELETE_SQUAD_MEMBER)
  const [expanded, setExpanded] = useState(false)
  const [open, setOpen] = useState(false)
  const [memberToDelete, setMemberToDelete] = useState({})

  const user = props.user
  const manage = inCommandSquad(user)
  const classes = useStyles()

  const handleClose = (value) => {
    if (value) {
      setMemberToDelete({})
      dispatch(deleteSquadMember(memberToDelete))
      deleteSquadMemberQuery({ variables: { id: memberToDelete.id } })
    }
    setOpen(false);
  };

  const openDeleteModal = member => {
    setMemberToDelete(member)
    setOpen(true)
  }

  const handleExpandChange = (event, newValue) => {
    setExpanded(newValue)
  }

  const commanders = filterMembers(user.squad.members, ['commander', 'deputy_commander', 'journalist'])
  const members = filterMembers(user.squad.members, ['student'])
  
  
  return <Paper style={{minHeight: '90vh'}}>
  <Container className='d-flex flex-column'>
    { manage ? <RemoveFromSquadModal user={memberToDelete.user} open={open} handleClose={handleClose}/> : "" }
    <div className={'d-flex flex-column flex-lg-row justify-content-lg-between justify-content-center'}>
      <div className='pt-4 mr-lg-3 align-self-center align-self-lg-left d-flex flex-row' > 
        <Typography variant='h4' component='h1' style={{fontSize: '28px'}}>
          Взвод № {user.squad.squadNumber}
        </Typography>
        { manage ? 
          <GroupAddIcon className={classes.requestsIcon}/>
          :
          ""
        }
      </div>
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
    <Advertisment manage={manage} user={user}/>
    <Paper className={'d-flex flex-column mt-5'} square variant="outlined" style={{minHeight: '500px'}}>
      <div className='d-flex flex-column'> 
        <Typography variant='h4' className='my-4 text-center'>
          <b>Командный состав</b>
        </Typography>
        { commanders.length ? commanders.map((member, index) => {
          return <SquadMemberCard manage={manage} openDeleteModal={openDeleteModal} currentUser={user} key={index} member={member}/>  
        }) : noMembers(user) }
      </div>
      <div className='d-flex flex-column'> 
        <Typography variant='h4' className='my-4 text-center'>
          <b>Состав</b>
        </Typography>
        { members.length ? members.map((member, index) => {
          return <SquadMemberCard manage={manage} openDeleteModal={openDeleteModal} currentUser={user} key={index} member={member}/>  
        }) : noMembers(user) }
      </div>
    </Paper>
  </Container>
</Paper> 
}