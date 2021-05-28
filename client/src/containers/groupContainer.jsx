import NavBar from "../layout/NavBar"
import { Switch, Route, useHistory } from "react-router-dom"
import { useState, useEffect } from "react"
import {postGroup} from "../services/group"
import React from 'react'
import NewGroup from "../screens/newGroup/newGroup"

const GroupContainer = (props) => {

  const { currentUser, setCurrentUser } = props
  const [entryError, setEntryError] = useState([])
  
  const handlePostGroup = async (groupData) => {
    setEntryError([])
    try {
      const updatedUser = await postGroup(groupData)
      setCurrentUser(updatedUser)
    } catch (error) {
      setEntryError(error)
    }
  }


  return (
    <>
      <NavBar currentUser={currentUser}>
        
      <Route path="/group/:id">
      </Route>

      
        <Route path="/group/new-group">
          <NewGroup handlePostGroup={handlePostGroup}/>
      </Route>

      </NavBar>
    </>
  )
}

export default GroupContainer
