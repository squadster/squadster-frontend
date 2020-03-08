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
    height: '10vh'
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
