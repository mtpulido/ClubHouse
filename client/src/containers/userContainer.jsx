import React from 'react'
import {useState, useEffect } from "react"
import { getUser, postRound } from "../services/user"
import NavBar from "../layout/NavBar"
import { Switch, Route, useHistory } from "react-router-dom"
import Dashboard from "../screens/dashboard/Dashboard"
import NewRound from "../screens/newRound/NewRound"

const UserContainer = (props) => {
  const history = useHistory()
  const {currentUser, setCurrentUser} = props
  const [open, setOpen] = useState(false)


  const handlePostRound = async (roundData) => {
    const updatedUser = await postRound(roundData)
    setCurrentUser(updatedUser)
    history.push("/user/dashboard")
  }

  return (
    <>
      <Switch>
            <NavBar setOpen={setOpen} open={open}>
        <Route path="/user/dashboard">
          <Dashboard open={open}/>
          </Route>

          <Route path="/user/new-round">
            <NewRound handlePostRound={handlePostRound}/>
          </Route>

          </NavBar>
      </Switch>
    </>
  )
}

export default UserContainer
