import React, { useState } from 'react'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Container, Typography, Paper, Badge, ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, IconButton } from '@material-ui/core'
import { getWeekDay, isCommander } from 'helpers'
import SquadMemberCard from './components/SquadMemberCard/SquadMemberCard'
import Advertisment from './components/Advertisment'
import GroupAddIcon from '@material-ui/icons/GroupAdd'
import { makeStyles } from '@material-ui/core/styles'
import ConfirmationModal from './components/ConfirmationModal'
import RequestsModal from './components/RequestsModal/RequestsModal'
import SquadPageContentStyles from './SquadPageContent.styles'
import { useDispatch, useSelector } from 'react-redux'
import { useMutation } from '@apollo/react-hooks'
import { deleteSquadMember, updateSquadMember, setSquadMembers } from 'actions/current_user_actions'
import { DELETE_SQUAD_MEMBER, UPDATE_SQUAD_MEMBER, UPDATE_SQUAD_MEMBERS } from 'requests'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const useStyles = makeStyles(SquadPageContentStyles)

function filterMembers(members, roles) {
  return members.filter((member) => {
    return roles.includes(member.role)
  })
}

function reorder(list, startIndex, endIndex) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  result.forEach((member, index) => {
    member.queueNumber = index + 1
  })

  return result;
};

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
  const [deleteSquadMemberQuery] = useMutation(DELETE_SQUAD_MEMBER)
  const [updateSquadMemberQuery] = useMutation(UPDATE_SQUAD_MEMBER)
  const [expanded, setExpanded] = useState(false)
  const [open, setOpen] = useState(false)
  const [requestsOpen, setRequestsOpen] = useState(false)
  const [confirmationModalOptions, setConfirmationModalOptions] = useState({})

  const user = useSelector(state => state.currentUser)
  const requests = useSelector(state => state.currentUser.squad.requests.filter((request) => !request.approvedAt))

  const [manage, setManage] = useState(isCommander(user))

  const userMember= user.squad.members.find(member => member.user.id === user.id)
  const classes = useStyles()

  const openModal = (member, message, operation) => {
    setConfirmationModalOptions({
      message: message,
      handleClose: (value) => {
        if (value)
          switch (operation) {
            case 'deleteMember': {
              dispatch(deleteSquadMember(member))
              deleteSquadMemberQuery({ variables: { id: member.id } })
              break
            }
            case 'updateMemberRole': {
              dispatch(updateSquadMember(member, userMember))
              setManage(userMember.role === 'commander')
              updateSquadMemberQuery({variables: { id: member.id, role: member.newAttributes.role } })
              break
            }
            default: {}
          }

        setOpen(false)
      }
    })
    setOpen(true)
  }

  const handleExpandChange = (event, newValue) => {
    setExpanded(newValue)
  }

  const commanders = filterMembers(user.squad.members, ['commander', 'deputy_commander', 'journalist'])
  const members = filterMembers(user.squad.members, ['student']).sort((a, b) => a.queueNumber - b.queueNumber )
  const [updateSquadMembersQuery] = useMutation(UPDATE_SQUAD_MEMBERS)
  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination)
      return
  
    const newMembers = reorder(
      members,
      result.source.index,
      result.destination.index
    );

    dispatch(setSquadMembers(commanders.concat(newMembers)))
    updateSquadMembersQuery({variables: { members: newMembers.map(({id, queueNumber}) => ({id, queueNumber})) }})
  }


  return <Paper style={{minHeight: '90vh'}}>
  <Container className='d-flex flex-column'>
    { manage ?
      <div>
        <ConfirmationModal open={open} options={confirmationModalOptions} />
        <RequestsModal open={requestsOpen} setOpen={setRequestsOpen} requests={requests}/>
      </div> : '' }
    <div className={'d-flex flex-column flex-lg-row justify-content-lg-between justify-content-center'}>
      <div className='pt-4 mr-lg-3 align-self-lg-left d-flex flex-row' >
        <div className='d-flex flex-row'>
          <Typography variant='h4' className={classes.squadTitle} component='h1'>
            Взвод № {user.squad.squadNumber}
          </Typography>
          { manage && <IconButton onClick={() => setRequestsOpen(true)} className={classes.requestsButton}>
              <Badge badgeContent={requests.length} color="primary">
                <GroupAddIcon style={{cursor: 'pointer'}} className={classes.requestsIcon}/>
              </Badge>
            </IconButton>}
        </div>
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
    <DragDropContext onDragEnd={onDragEnd}>
      <Paper className={'d-flex flex-column mt-5'} square variant="outlined" style={{minHeight: '500px'}}>
        <div className='d-flex flex-column'>
          <Typography variant='h4' className='my-4 text-center'>
            <b>Командный состав</b>
          </Typography>
          { commanders.length ? commanders.map((member, index) => {
            return <SquadMemberCard manage={manage} openModal={openModal} currentUser={user} key={index} member={member}/>
          }) : noMembers(user) }
        </div>
        <div className='d-flex flex-column'>
          <Typography variant='h4' className='my-4 text-center'>
            <b>Состав</b>
          </Typography>
          <Droppable isDropDisabled={!manage} droppableId='members'>
            {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              { members.length ? members.map((member, index) => {
                return <Draggable isDragDisabled={!manage} key={member.id} draggableId={member.id} index={index}>
                {(provided, snapshot) => (
                  <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    <SquadMemberCard manage={manage} openModal={openModal} currentUser={user} index={index} key={index} member={member}/>
                  </div>
                )}
              </Draggable>
              }) : noMembers(user) }
              {provided.placeholder}
            </div>)}
          </Droppable> 
        </div>
      </Paper>
    </DragDropContext>
  </Container>
</Paper>
}
