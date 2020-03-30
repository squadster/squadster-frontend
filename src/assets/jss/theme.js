import { createMuiTheme } from "@material-ui/core/styles";

const breakpointValues = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
};

export default createMuiTheme({
  overrides: {
    body: {
      fontFamily: 'Roboto,Helvetica,Arial,sans-serif',
      backgroundColor: '#eaeff1',
      fontWeight: '300',
    }
  },
  breakpoints: { values: breakpointValues }
});
