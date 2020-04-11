import theme from '../../theme'

const SquadsStyles = {
  newSquadMessageRoot: {
    marginTop: '10%',
    padding: '24px'
  },

  newSquadMessageIcon: {
    marginTop: 'auto',
    marginBottom: 'auto',
    height: 'initial',

    [theme.breakpoints.down('xs')]: {
      marginRight: 'auto',
      marginLeft: 'auto',
    }
  },

  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: '-webkit-fit-content',
  },

  selectEmpty: {
    marginTop: theme.spacing(2),
  },

  newSquadMessageLink: {
    textDecoration: 'none',
    marginLeft: 'auto',
    marginTop: '16px',
    color: 'white !important',

    [theme.breakpoints.down('sm')]: {
      marginTop: '24px',
      width: '100%'
    }
  },

  selectRoot: {
    minWidth: '185px',
    width: '-webkit-fill-available',
    color: 'inherit',
    'borderBottom&:focus-within': {
      borderColor: '#00acc1 !important',
    },
  },

  inputRoot: {
    width: '-webkit-fit-content',
    color: 'inherit',
    borderBottom: '1px solid rgba(0, 0, 0, 0.42)',
    '&:focus-within': {
      borderColor: '#00acc1 !important',
    },
  },

  inputInput: {
    padding: theme.spacing(2, 1, 1, 0),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },

  newSquadMessageTitle: {
    marginBottom: '16px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '27px'
    }
  },

  newSquadMessageText: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '16px'
    }
  },
}

export default SquadsStyles;
