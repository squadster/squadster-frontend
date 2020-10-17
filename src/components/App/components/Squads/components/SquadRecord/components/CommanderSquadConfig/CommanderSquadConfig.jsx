import React, { useState } from 'react'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import SettingsIcon from '@material-ui/icons/Settings'
import './CommanderSquadConfig.scss'

export default function CommanderSquadConfig({squad}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const linkOption = squad.linkInvitationEnabled

  const deleteSquad = () => {

  }

  const patchSquad = (params) => {
    
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null)
  };

  return (
    <div>
      <SettingsIcon style={{cursor: 'pointer'}} aria-controls="commander-squad-config" aria-haspopup="true" onClick={handleClick} />
      <Menu
        id="commander-squad-config"
        anchorEl={anchorEl}
        keepMounted
        className='commander-squad-menu'
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={}>{linkOption ? 'Выключить' : 'Включить'} доступ по ссылке</MenuItem>
        <MenuItem className='commander-squad-menu__danger-item' onClick={handleClose}>Расформировать взвод</MenuItem>
      </Menu>
    </div>
  );
}
