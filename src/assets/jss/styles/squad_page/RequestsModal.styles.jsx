const RequestsModalStyles = (theme) => ({  
  listItemText: {
    maxWidth: '80%',
    [theme.breakpoints.down('xs')]: {
      maxWidth: 'initial'
    }
  },

  avatarContainer: { 
    marginRight: '16px',
    display: 'flex'
  },

  title: {
    '& > h2': {
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between'
    }
  },

  avatar: {
    height: '60px',
    width: '60px',
    marginTop: 'auto',
    marginBottom: 'auto'
  }
})

export default RequestsModalStyles;