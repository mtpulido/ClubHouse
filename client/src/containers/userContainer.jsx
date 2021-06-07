import React from 'react'
import {useState } from "react"
import { postRound, editRound, editSettings } from "../services/user"
import NavBar from "../layout/NavBar"
import { Switch, Route, useHistory } from "react-router-dom"
import Dashboard from "../screens/dashboard/Dashboard"
import DetailsRound from "../screens/detailsRound/DetailsRound"
import EditRound from "../screens/editRound/EditRound"
import Settings from "../screens/settings/Settings"
import { signOut } from "../services/auth";
import NewRound from "../screens/NewRound/NewRound"


const UserContainer = (props) => {
  const history = useHistory()
  const { currentUser, setCurrentUser, setToggleFetch } = props
  const [entryError, setEntryError] = useState([])
  const [isError, setIsError] = useState(false)
  const [open, setOpen] = useState(false)
  const [snackBar, setSnackBar] = useState(false)
  const [test, setTest] = useState("test")



  const handlePostRound = async (roundData) => {
    setIsError(false)
    setEntryError([])
    try {
      const updatedUser = await postRound(roundData)
      setCurrentUser(updatedUser)
      setToggleFetch((curr) => !curr)
      history.push("/user/dashboard")
    } catch (error) {
      setIsError(true)
      setEntryError(error)
    }
  }

  const handleEditRound = async (roundData) => {
    setIsError(false)
    try {
      const updatedUser = await editRound(roundData)
      setCurrentUser(updatedUser)
      setEntryError([])
      setToggleFetch((curr) => !curr)
      history.push('/user/dashboard')
    } catch (error) {
      setIsError(true)
      setEntryError(error)
    }
  }

  const handleSignOut = () => {
    setCurrentUser(null);
    localStorage.removeItem("token");
    signOut();
    history.push("/");
  };

  const handleEditSettings = async (data) => {
    setEntryError([])
    try {
      const user = await editSettings(data)
      setCurrentUser(user)
      setToggleFetch((curr) => !curr)
      setEntryError([])
      setSnackBar(true);
      setTimeout(() => {
        setSnackBar(false);
      }, 2000);
    } catch (error) {
      setEntryError(error.response.data.errors.displayName)
    }
  }

  return (
    <>
      <Switch>
        <NavBar setOpen={setOpen} open={open} currentUser={currentUser}>
        <Route path="/user/dashboard">
            <Dashboard open={open} currentUser={currentUser} />
          </Route>

          <Route path="/user/new-round">
            <NewRound handlePostRound={handlePostRound} entryError={entryError} isError={isError}/>
          </Route>

          <Route exact path="/user/round/:id">
            <DetailsRound currentUser={currentUser}/>
          </Route>

          <Route exact path="/user/settings">
            <Settings handleSignOut={handleSignOut} currentUser={currentUser} setEntryError={setEntryError} snackBar={snackBar} entryError={entryError} handleEditSettings={handleEditSettings}/>
          </Route>


          <Route exact path="/user/round/edit/:id">
            <EditRound currentUser={currentUser} entryError={entryError} isError={isError} handleEditRound={handleEditRound}/>
          </Route>

          </NavBar>
      </Switch>
    </>
  )
}

export default UserContainer
