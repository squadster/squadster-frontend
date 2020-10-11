import React, { useState } from 'react'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import SettingsIcon from '@material-ui/icons/Settings'
import Alert from '@material-ui/lab/Alert'

export default function CommanderSquadConfig({deleteSquad, patchSquad}) {
  const [anchorEl, setAnchorEl] = React.useState(null);

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
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Включить доступ по ссылке</MenuItem>
        <MenuItem onClick={handleClose}><Alert severity="error" variant='filled'>Расформировать взвод</Alert></MenuItem>
      </Menu>
    </div>
  );
}
