import theme from '../theme'

const SquadsStyles = {  
  emptySquadMessageRoot: {
    marginTop: '10%',
    padding: '24px'
  },

  emptySquadMessageIcon: {
    marginTop: 'auto',
    marginBottom: 'auto',
    height: 'initial',

    [theme.breakpoints.down('xs')]: {
      marginRight: 'auto',
      marginLeft: 'auto',
    }
  },

  emptySquadMessageLink: {
    textDecoration: 'none',
    width: '100px',
    marginLeft: 'auto',
    marginTop: '16px',
    color: 'white !important',

    [theme.breakpoints.down('sm')]: {
      marginTop: '24px',
      width: '100%'
    }
  },

  emptySquadMessageTitle: {
    marginBottom: '16px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '27px'
    }
  },

  emptySquadMessageText: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '16px'
    }
  }
}

export default SquadsStyles;
