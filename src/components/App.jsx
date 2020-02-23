import React from "react";
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import Navbar from './Navbar';
import PrivateRoute from './PrivateRoute'
import AuthCallback from "./auth/AuthCallback.jsx";
import Squads from "./Squads.jsx";
import About from "./About.jsx";

function setAxiosInterceptors() {
  axios.interceptors.request.use(function (config) {
    const token = localStorage.authToken;
    config.headers['Authorization'] = token;
    return config;
  });
}

export default function App() {
  setAxiosInterceptors();

  return (
    <Router>
      <div>
        <nav>
          <Navbar />
        </nav>

        <Switch>
          <Route path="/about" component={About} />
          <PrivateRoute path="/squads" component={Squads} />
          <Route path="/auth_callback" component={AuthCallback} />
        </Switch>
      </div>
    </Router>
  );
}
