import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';

import './assets/css/default.styles.css';
import theme from "./theme";
import store from "./store/index";
import App from "./components/App/App";
import { apolloClient } from './helpers';
import { ApolloProvider } from 'react-apollo'


window.store = store;

render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Provider store={store}>
      <ApolloProvider client={apolloClient}>
        <App />
      </ApolloProvider>
    </Provider>
  </ThemeProvider>,
  document.getElementById("root")
);
