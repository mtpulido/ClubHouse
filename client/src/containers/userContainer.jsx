import React from 'react'
import {useState, useEffect } from "react"
import { getUser, postRound, editRound } from "../services/user"
import NavBar from "../layout/NavBar"
import { Switch, Route, useHistory } from "react-router-dom"
import Dashboard from "../screens/dashboard/Dashboard"
import NewRound from "../screens/newRound/NewRound"
import DetailsRound from "../screens/detailsRound/DetailsRound"
import EditRound from "../screens/editRound/EditRound"

const UserContainer = (props) => {
  const history = useHistory()
  const { currentUser, setCurrentUser } = props
  const [entryError, setEntryError] = useState([])
  const [isError, setIsError] = useState(false)
  const [open, setOpen] = useState(false)



  const handlePostRound = async (roundData) => {
    setIsError(false)
    try {
      const updatedUser = await postRound(roundData)
      setCurrentUser(updatedUser)
      setEntryError([])
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
      history.push('/user/dashboard')
    } catch (error) {
      setIsError(true)
      setEntryError(error)
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

          <Route path="/user/round/edit/:id">
            <EditRound currentUser={currentUser} entryError={entryError} isError={isError} handleEditRound={handleEditRound}/>
          </Route>
          <Route path="/user/round/:id">
            <DetailsRound currentUser={currentUser}/>
          </Route>

          </NavBar>
      </Switch>
    </>
  )
}

export default UserContainer
