import React, { useState } from 'react'
import { Container, Typography, Paper, Badge, IconButton } from '@material-ui/core'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { isCommander, canChangeClassDay } from 'helpers'
import SquadMemberCard from './components/SquadMemberCard/SquadMemberCard'
import Advertisment from './components/Advertisment'
import Schedule from './components/Schedule/Schedule'
import ClassDay from './components/ClassDay'
import SquadNumber from './components/SquadNumber'
import GroupAddIcon from '@material-ui/icons/GroupAdd'
import { makeStyles } from '@material-ui/core/styles'
import ConfirmationModal from 'components/App/components/shared/ConfirmationModal'
import RequestsModal from './components/RequestsModal/RequestsModal'
import SquadPageContentStyles from './SquadPageContent.styles'
import { useDispatch, useSelector } from 'react-redux'
import { useMutation } from '@apollo/react-hooks'
import { deleteSquadMember, updateSquadMember, setSquadMembers } from 'actions/current_user_actions'
import { DELETE_SQUAD_MEMBER, UPDATE_SQUAD_MEMBER, UPDATE_SQUAD_MEMBERS } from 'requests'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import MemberSquadConfig from 'components/App/components/Squads/components/SquadRecord/components/MemberSquadConfig'
import CommanderSquadConfig from 'components/App/components/Squads/components/SquadRecord/components/CommanderSquadConfig/CommanderSquadConfig'
import { COMMANDER_ROLES } from 'static'
import './SquadPageContent.scss'
import CopyToClipboardButton from 'components/App/components/shared/CopyToClipboardButton'

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

function buildInvitationLink(hashId) {
  return `${window.origin}/invitation/${hashId}`
}

export default function SquadPageContent(_props) {
  const dispatch = useDispatch()
  const [deleteSquadMemberQuery] = useMutation(DELETE_SQUAD_MEMBER)
  const [updateSquadMemberQuery] = useMutation(UPDATE_SQUAD_MEMBER)
  const [open, setOpen] = useState(false)
  const [requestsOpen, setRequestsOpen] = useState(false)
  const [confirmationModalOptions, setConfirmationModalOptions] = useState({})

  const user = useSelector(state => state.currentUser)
  const requests = useSelector(state => state.currentUser.squad.requests.filter((request) => !request.approvedAt))

  const userMember= user.squad.members.find(member => member.user.id === user.id)
  const [manage, setManage] = useState(isCommander(userMember))

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


  return <Paper>
  <Container className='d-flex flex-column'>
    { manage ?
      <>
        <ConfirmationModal open={open} options={confirmationModalOptions} />
        <RequestsModal open={requestsOpen} setOpen={setRequestsOpen} requests={requests}/>
      </> : '' }
    <div className={'d-flex flex-column flex-lg-row justify-content-lg-between justify-content-center'}>
      <div className='pt-4 mr-lg-3 align-self-lg-left d-flex flex-row' >
        <div className='d-flex flex-column'>
          <div className='d-flex flex-row'>
            <SquadNumber user={user} classes={classes} />
            {
              manage && <IconButton onClick={() => setRequestsOpen(true)} className={classes.requestsButton}>
                <Badge badgeContent={requests.length} color="primary">
                  <GroupAddIcon style={{cursor: 'pointer'}} className={classes.requestsIcon}/>
                </Badge>
              </IconButton>
            }
            { COMMANDER_ROLES.includes(user.squadMember.role) &&
                <IconButton className={classes.configButton}>
                  <CommanderSquadConfig user={user} squad={user.squad} />
                </IconButton>
            }
            { user.squadMember.role === 'student' && <IconButton className={classes.configButton}><MemberSquadConfig squad={user.squad} /></IconButton> }
          </div>
          {
            user.squad.linkInvitationsEnabled &&
            <CopyToClipboardButton className='mt-4'
                                   buttonOptions={{variant: 'contained', color: 'primary'}}
                                   tooltipText='Скопировать ссылку на приглашение'
                                   text={buildInvitationLink(user.squad.hashId)}>
              Копировать приглашение
            </CopyToClipboardButton>
          }
        </div>
      </div>
      <div className={classes.classDay}>
        <ClassDay classDay={user.squad.classDay} manage={canChangeClassDay(userMember)} user={user}/>
      </div>
    </div>
    <Advertisment manage={manage} user={user}/>
    <Schedule user={user}/>
    <DragDropContext onDragEnd={onDragEnd}>
      <Paper className={'d-flex flex-column mt-5 mb-5'} square variant="outlined" style={{minHeight: '500px'}}>
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography variant='h4' className='my-4 text-center'>
              <b>Командный состав</b>
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className='flex-column p-0'>
            { commanders.length ? commanders.map((member, index) => {
              return <SquadMemberCard manage={manage} openModal={openModal} currentUser={user} key={index} member={member}/>
            }) : noMembers(user) }
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <div className='d-flex flex-column'>
          <Typography variant='h4' className='my-4' style={{paddingLeft: "24px"}}>
            <b>Очередь на дежурство</b>
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
