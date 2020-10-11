import React, { useState } from 'react'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import SettingsIcon from '@material-ui/icons/Settings'

export default function CommanderSquadConfig({leaveSquad, squad}) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null)
  };

  return (
    <div>
      <SettingsIcon style={{cursor: 'pointer'}} aria-controls='squad-member-config'  aria-haspopup="true" onClick={handleClick} />
      <Menu
        id='squad-member-config'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Покинуть взвод</MenuItem>
      </Menu>
    </div>
  );
}
