import React, { useState } from 'react'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { Chip, Select, MenuItem } from '@material-ui/core'
import { getMemberRole } from '../../helpers'
import { makeStyles } from '@material-ui/core/styles';
import RoleChipStyles from '../../assets/jss/styles/squad_page/RoleChip.styles'

const useStyles = makeStyles(RoleChipStyles)

function updateMemberRoleMessage(user, newRole) {
  let message = "Вы уверены что хотите "
  const userName = `${user.firstName} ${user.lastName}`

  if (newRole === 'commander')
    message += `передать командование взводом пользователю ${userName}? В таком случае вы потеряете возможность управлять взводом.`
  else
    message += `выдать пользователю ${userName} роль "${getMemberRole(newRole)}"?`

  return message
}

export default function RoleChip(props) {
  const [open, setOpen] = useState(false)
  const classes = useStyles()
  const handleChange = (e) => {
    props.member.newAttributes = { role: e.target.value }
    props.openModal(props.member, updateMemberRoleMessage(props.member.user, e.target.value), 'updateMemberRole')
  }

  return <div className={props.classes + ' position-relative'}>
    <Chip color="primary" label={getMemberRole(props.member.role)} />
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
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          value={props.member.role}
          onChange={handleChange}
        >
          {['student', 'journalist', 'commander', 'deputy_commander'].filter((role) => role !== props.member.role).map((role, index) => {
            return <MenuItem key={index} value={role}>{getMemberRole(role)}</MenuItem> 
          })}
          <MenuItem className='d-none' value={props.member.role}>{getMemberRole(props.memberRole)}</MenuItem> 
        </Select>
      </div>
      : '' }
  </div>


}