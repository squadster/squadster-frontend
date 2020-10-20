import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Toolbar, AppBar, IconButton, Collapse, Avatar, MenuItem } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import AppStyles from '../../App.styles'
import SVG from 'react-inlinesvg';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { API_URL } from '../../../../constants'
import { isMobile, logout } from 'helpers'
import Popper from '@material-ui/core/Popper';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MenuList from '@material-ui/core/MenuList';
import ExpandMoreSharpIcon from '@material-ui/icons/ExpandMoreSharp';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

const useStyles = makeStyles(AppStyles);

export default function Navbar() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.currentUser);
  const squad = useSelector(state => state.currentUser ? state.currentUser.squad : undefined);
  const [expanded, setExpanded] = useState(isMobile ? false : true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <div className={classes.navbar}>
      <AppBar height='10vh' position="static">
        { isMobile ?
          <IconButton onClick={() => setExpanded(!expanded)} className={classes.collapsedButton} edge="end"  color="inherit">
            <MenuIcon />
          </IconButton> : ''
        }
        <Collapse in={expanded}>
          {currentUser ? (
            <Toolbar className={classes.toolbar}>
              { open ?
                <IconButton onClick={handleClick} >
                  <MoreHorizIcon className={classes.moreHorizIcon}/>
                </IconButton>
                :
                <IconButton onClick={handleClick}>
                  <div className={classes.avatarBorder}>
                    <Avatar
                      alt={currentUser.id}
                      src={currentUser.imageUrl}
                      className={classes.avatar}
                    />
                  </div>
                  <ExpandMoreSharpIcon/>
                </IconButton>
              }
              <Popper open={open} anchorEl={anchorEl} role={undefined} transition disablePortal>
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleClose} >
                        <MenuList autoFocusItem={open} id="menu-list-grow" className={classes.paperMenu}>
                          <MenuItem className={classes.menuItem} component={Link} to='/profile'>Профиль</MenuItem>
                          { squad &&
                            <MenuItem className={classes.menuItem} component={Link} to='/my-squad'>Мой взвод</MenuItem> }
                          { !squad &&
                            <MenuItem className={classes.menuItem} component={Link} to='/squads'>Взводы</MenuItem> }
                          <MenuItem onClick={() => logout(dispatch)}>Выйти</MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </Toolbar>
            ) : (
            <Toolbar className={classes.toolbar}>
              <Button onClick={() => window.location.href = `${API_URL}/api/auth/keks`} color="inherit">
                <SVG src='VK_Blue_Logo.svg' width='50px'/>
                Войти
              </Button>
            </Toolbar>
            )}
        </Collapse>
      </AppBar>
    </div>
  );
}
