import { fade } from '@material-ui/core/styles';

const SquadsStyles= (theme) => ({
  paper: {
    padding: '2%',
    margin: '3%',
    [theme.breakpoints.down('xs')]: {
      margin: '3%'
    },
  },

  h2: {
    fontSize: '2.25rem',
    lineHeight: '1.5em',
    fontWeight: '300',
  },

  h3: {
    fontSize: '1.5625rem',
    lineHeight: '1.4em',
    fontWeight: '300',
  },

  h4: {
    fontSize: '1.125rem',
    lineHeight: '1.5em',
    fontWeight: '300',
  },

  search: {
    color: '#AAAAAA',
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },

  searchIcon: {
    width: theme.spacing(7),
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  inputRoot: {
    color: 'inherit',
    borderBottom: '1px solid rgba(0, 0, 0, 0.42)',
    '&:focus-within': {
      borderColor: '#00acc1 !important',
    },
  },

  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },

  TableCell: {
    backgroundColor: '#3f51b5',
    color: theme.palette.common.white,
    width: '283px',
  },

  Table: {
    width: '566px',
  },

  squadIcon: {
    height: 'initial',
    maxHight: '100px',
    maxWidth: '100px',
    margin: 0,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',

    [theme.breakpoints.down('xs')]: {
      marginRight: 'auto',
      marginLeft: 'auto',
    }
  },

  button: {
    backgroundColor: '#3f51b5',
    color: 'white',
    '&:hover': {
      backgroundColor: '#303f9f',
      boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)',
    },
  },

  typography: {
    fontWeight: '300',
  },

  searchArea: {
    padding: 'inherit',
  },

  paginationAction: {
    display: 'flex',
  },
});

export default SquadsStyles;
