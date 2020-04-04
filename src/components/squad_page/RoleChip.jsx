import React, { useState } from 'react'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { Chip, Select, MenuItem } from '@material-ui/core'
import { getMemberRole } from '../../helpers'
import { makeStyles } from '@material-ui/core/styles';
import RoleChipStyles from '../../assets/jss/styles/squad_page/RoleChip.styles'

const useStyles = makeStyles(RoleChipStyles)

export default function RoleChip(props) {
  const [open, setOpen] = useState(false)
  const classes = useStyles()
  const handleClose = () => setOpen(false)
  const handleOpen = () => setOpen(true)
  const handleChange = () => {}

  return <div className={props.classes + ' position-relative'}>
    <Chip color="primary" label={getMemberRole(props.memberRole)} />
    { props.manage ? 
      <div>
        <ArrowDropDownIcon onClick={() => setOpen(true)} className={classes.arrow}/>
        <Select
          MenuProps={{
            getContentAnchorEl: null,
             anchorOrigin: {
              vertical: "bottom",
              horizontal: "left",
            }
          }}
          className={classes.select}
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={props.memberRole}
          onChange={handleChange}
        >
          {['student', 'journalist', 'commander', 'deputy_commander'].filter((role) => role !== props.memberRole).map((role, index) => {
            return <MenuItem key={index} value={role}>{getMemberRole(role)}</MenuItem> 
          })}
          <MenuItem className='d-none' value={props.memberRole}>{getMemberRole(props.memberRole)}</MenuItem> 
        </Select>
      </div>
      : '' }
  </div>


}