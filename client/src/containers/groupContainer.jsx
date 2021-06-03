import NavBar from "../layout/NavBar";
import { Switch, Route, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { postGroup, getGroups } from "../services/group";
import React from "react";
import NewGroup from "../screens/newGroup/newGroup";
import OneGroup from "../screens/group/Group";
import FindGroup from "../screens/findGroup/FindGroup";

const GroupContainer = (props) => {
  const { currentUser, setCurrentUser } = props;
  const [entryError, setEntryError] = useState([]);
  const history = useHistory();
  const [group, setGroup] = useState({});
  const [findGroup, setFindGroup] = useState([])

  const handlePostGroup = async (groupData) => {
    setEntryError([]);
    try {
      const updatedUser = await postGroup(groupData);
      setCurrentUser(updatedUser);
      history.push("/user/dashboard");
    } catch (error) {
      setEntryError(error);
    }
  };

  const handleGetGroups = async (groupData) => {
    setEntryError([]);
    setFindGroup([])
    try {
      const group = await getGroups(groupData);
      setFindGroup(group);
    } catch (error) {
      setEntryError(error.response.data.error);
    }
  }

  return (
    <>
      <Switch>
        <NavBar currentUser={currentUser} group={group}>

        <Route exact path="/group/new/group">
            <NewGroup handlePostGroup={handlePostGroup} />
          </Route>

          <Route exact path="/group/find/group">
            <FindGroup handleGetGroups={handleGetGroups} entryError={entryError} findGroup={findGroup}/>
          </Route>

          <Route exact path="/group/:id">
            <OneGroup group={group} setGroup={setGroup} />
          </Route>
          
        </NavBar>
      </Switch>
    </>
  );
};

export default GroupContainer;
