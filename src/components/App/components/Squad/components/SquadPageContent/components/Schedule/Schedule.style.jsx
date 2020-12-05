const ScheduleStyles = (theme) => ({
  avatarBorder: {
    borderRadius: '50%',
    height: '74px',
    width: '74px',
  },

  lessonType: {
    fontSize: '2rem',
    position: 'absolute',
    top: '26%',
    textAlign: 'center',
    left: '9%',
    color: 'white',
  },

  buttonWithoutHover: {
    '&:hover': {
      backgroundColor: 'inherit',
      boxShadow: 'inherit',
    },
  },
});


export default ScheduleStyles;
