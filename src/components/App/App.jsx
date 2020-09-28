import React, { useState, useCallback } from "react"
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Squad from './components/Squad/Squad'
import PrivateRoute from './components/PrivateRoute'
import AuthCallback from "./components/AuthCallback.jsx"
import Squads from "./components/Squads/Squads.jsx"
import About from "./components/About.jsx"
import { useSelector, useDispatch } from 'react-redux'
import { GET_CURRENT_USER } from 'requests'
import { useQuery } from '@apollo/react-hooks'
import Spinner from './components/shared/Spinner'
import { setCurrentUser } from 'actions/current_user_actions'
import { setAxiosInterceptors, logout } from 'helpers'
import NewSquad from "./components/NewSquad/NewSquad"
import Landing from './components/Landing'
import MuiAlert from '@material-ui/lab/Alert'
import { Snackbar } from '@material-ui/core'
import { AlertContext } from 'contexts'

function Alert(props) { return <MuiAlert elevation={6} variant="filled" {...props} /> }

export default function App() {
  setAxiosInterceptors();
  const user = useSelector(state => state.currentUser)
  const dispatch = useDispatch()
  const { loading, data } = useQuery(GET_CURRENT_USER, { skip: !localStorage.authToken, onError: () => logout(dispatch) } )
  
  // Alert state can be moved to the separate hook it's not necessary for now
  // as we have one global Snackbar
  //
  const [alertState, setAlertState] = useState({})
  const [openAlert, setOpenAlert] = useState(false)
  const closeAlert = useCallback(() => setOpenAlert(false), [])
  const showAlert = useCallback(({variant='success', message}) => {
    setAlertState({variant: variant, message: message})
    setOpenAlert(true)
  }, [])

  if (loading) {
    return <Spinner/>
  }

  if (!user && data && data.currentUser) {
    dispatch(setCurrentUser(data.currentUser))
  }


  return (
    <Router>
      <div>
        <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={5000} open={openAlert} onClose={closeAlert}>
          <Alert onClose={closeAlert} severity={alertState.variant || 'success'}>
            {alertState.message}
          </Alert>
        </Snackbar>
        <AlertContext.Provider value={showAlert}>
          <Navbar />
          <Switch>
            <Route exact path="/about" component={About} />
            <PrivateRoute exact path="/squads" component={Squads} />
            <PrivateRoute exact path="/my_squad" component={Squad} />
            <PrivateRoute exact path="/new_squad" component={NewSquad} />
            <Route path="/auth_callback" component={AuthCallback} />
            <Route path="/" component={user ? () => <Redirect to='/my_squad' /> : Landing} />
            <Redirect from="*" to="/" />
          </Switch>
        </AlertContext.Provider>
      </div>
      <Footer />
    </Router>
  );
}
