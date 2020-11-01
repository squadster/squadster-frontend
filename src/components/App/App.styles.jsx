const AppStyles = (theme) => ({
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    height: '7vh',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      justifyContent: 'initial'
    }
  },

  navbarLink: {
    color: 'white !important',
    marginLeft: theme.spacing(3)
  },

  collapsedButton: {
    width: 'max-content',
    alignSelf: 'flex-end',
    marginRight: '0px',
    marginTop: 'auto',
    marginBottom: 'auto'
  },

  button: {
    marginTop: 'auto',
    marginBottm: 'auto'
  },

  grow: {
    flexGrow: 1,
  },

  menuButton: {
    marginRight: 2,
  },

  title: {
    display: 'none',
    breakpoints: {
      display: 'block',
    },
  },

  avatar: {
    width: '104px',
    height: '104px',
    border: 'solid',
    borderColor: 'white',
  },

  moreHorizIcon: {
    width: '104px',
    height: '7vh',
  },

  avatarBorder: {
    borderRadius: '50%',
    border: 'solid',
    borderColor: '#3f51b5',
    marginTop: '50px',
  },

  paperMenu: {
    fontFamily: 'Roboto,Helvetica,Arial,sans-serif',
    fontWeight: '300',
    border: '1px solid #e0e0e0',
    borderRadius: '3%',
  },

  footer: {
    width: '100%',
    marginTop: 'auto'
  },

  menuItem: {
    borderBottom: '1px solid #e0e0e0',
    minWidth: '180px',
    minHeight: '45px'
  },
});


export default AppStyles;
