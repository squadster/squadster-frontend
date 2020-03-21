import theme from "../theme";

const AppStyles = {
  root: { },
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
  },

  collapsedButton: {
    width: 'max-content',
    alignSelf: 'flex-end',
    marginRight: '0px',
  }
}

export default AppStyles;
