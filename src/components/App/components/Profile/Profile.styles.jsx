import theme from '../../../../theme'

const SquadsStyles = {
  avatar: {
    marginTop: 'auto',
    marginBottom: 'auto',
    width: '208px',
    height: '208px',

    [theme.breakpoints.down('xs')]: {
      marginRight: 'auto',
      marginLeft: 'auto',
    },
  },

  root: {
    marginTop: '10%',
    padding: '24px',
  },

  profileTitle: {
    marginBottom: '16px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '27px'
    }
  },

  profileText: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '16px'
    }
  },
}

export default SquadsStyles;
