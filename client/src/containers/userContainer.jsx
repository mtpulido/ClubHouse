import React from 'react'
import {useState, useEffect } from "react"
import { getUser } from "../services/user"
import NavBar from "../layout/NavBar"
import { Switch, Route } from "react-router-dom"
import Dashboard from "../screens/dashboard/Dashboard"

const UserContainer = ({ currentUser }) => {
  console.log(currentUser)

  return (
    <>
      <Switch>
            <NavBar>
        <Route path="/user/dashboard">
          <Dashboard />
          </Route>

          </NavBar>
      </Switch>
    </>
  )
}

export default UserContainer
