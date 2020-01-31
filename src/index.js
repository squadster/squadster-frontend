import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';

import './assets/css/default.styles.css';

import theme from "./assets/jss/theme";
import store from "./store/index";
import App from "./components/App";

window.store = store;

render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>,
  document.getElementById("root")
);
