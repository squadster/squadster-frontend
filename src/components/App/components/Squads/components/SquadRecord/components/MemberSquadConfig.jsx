import React, { useContext, useState } from 'react'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import SettingsIcon from '@material-ui/icons/Settings'
import ConfirmationModal from 'components/App/components/shared/ConfirmationModal'
import { AlertContext } from 'contexts'
import { deleteSquad } from 'actions/squads_actions'
import { useDispatch, useSelector } from 'react-redux'
import { DELETE_SQUAD_MEMBER } from 'requests'
import { useMutation } from 'react-apollo'

export default function CommanderSquadConfig({_squad}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const user = useSelector(state => state.currentUser)
  const [open, setOpen] = useState(false)
  const showAlert = useContext(AlertContext)
  const dispatch = useDispatch()

  const [deleteSquadMemberQuery] = useMutation(DELETE_SQUAD_MEMBER)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null)
  };

  const leaveSquad = (confirmed) => {
    setOpen(false)

    if (confirmed) {
      deleteSquadMemberQuery({ variables: { id: user.squadMember.id } })

      handleClose()
      dispatch(deleteSquad())
      showAlert({message: "Вы вышли из взвода"})
    }
  }

  return (
    <div>
      <ConfirmationModal open={open} options={{handleClose: leaveSquad, message: "Вы уверены что хотите покинуть взвод?"}}/>
      <SettingsIcon style={{cursor: 'pointer'}} aria-controls='squad-member-config'  aria-haspopup="true" onClick={handleClick} />
      <Menu
        id='squad-member-config'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => setOpen(true)}>Покинуть взвод</MenuItem>
      </Menu>
    </div>
  );
}
