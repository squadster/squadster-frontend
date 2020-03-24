const AppStyles = (theme) => ({
  root: { },

  body: {
    fontFamily: 'Roboto,Helvetica,Arial,sans-serif',
    backgroundColor: '#eaeff1',
    fontWeight: '300',
  },

  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    minHeight: '10vh',
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
});


export default AppStyles;
