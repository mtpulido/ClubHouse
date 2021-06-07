import NavBar from "../layout/NavBar";
import { Switch, Route, useHistory } from "react-router-dom";
import { useState } from "react";
import { postGroup, getGroups, requestGroup, adminResponse, editGroupSettings } from "../services/group";
import React from "react";
import NewGroup from "../screens/newGroup/NewGroup";
import OneGroup from "../screens/group/Group";
import FindGroup from "../screens/findGroup/FindGroup";
import GroupRequests from "../screens/groupRequests/GroupRequests"
import GroupSettings from "../screens/groupSettings/GroupSettings"

const GroupContainer = (props) => {
  const { currentUser, setCurrentUser, setToggleFetch2 } = props;
  const [entryError, setEntryError] = useState([]);
  const history = useHistory();
  const [group, setGroup] = useState({});
  const [findGroup, setFindGroup] = useState([]);
  const [toggleFetch, setToggleFetch] = useState(false);
  const [open, setOpen] = useState(false)

  const handlePostGroup = async (groupData) => {
    setEntryError([]);
    try {
      const updatedUser = await postGroup(groupData);
      setCurrentUser(updatedUser);
      history.push("/user/dashboard");
      setToggleFetch2((curr) => !curr)
      setEntryError([])
    } catch (error) {
      setEntryError(error.response.data.errors.name);
    }
  };

  const handleGetGroups = async (groupData) => {
    setEntryError([]);
    setFindGroup([]);
    try {
      const group = await getGroups(groupData);
      setFindGroup(group);
    } catch (error) {
      setEntryError(error.response.data.error);
    }
  };

  const handleRequestGroup = async (id) => {
    try {
      await requestGroup(id);
      setToggleFetch((curr) => !curr);
    } catch (error) {
      throw error;
    }
  };

  const handleAdminResponse = async (id, data) => {
    
    try {
      const group = await adminResponse(id, data)
      setGroup(group)
      // setToggleFetch((curr) => !curr);
    } catch (error) {
      throw error;
    }
  }

  const handleEditGroupSettings = async (id, data) => {
    setEntryError([])
    try {
      const group = await editGroupSettings(id, data)
      setGroup(group)
      setEntryError([])
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
      }, 2000);
    } catch (error) {
      setEntryError(error.response.data.errors.name)
    }
  }

  return (
    <>
      <Switch>
        <NavBar currentUser={currentUser} group={group}>
          <Route exact path="/group/new/group">
            <NewGroup handlePostGroup={handlePostGroup} entryError={entryError} currentUser={currentUser}/>
          </Route>

          <Route exact path="/group/find/group">
            <FindGroup
              currentUser={currentUser}
              handleGetGroups={handleGetGroups}
              entryError={entryError}
              findGroup={findGroup}
              handleRequestGroup={handleRequestGroup}
              toggleFetch={toggleFetch}
            />
          </Route>
          <Route exact path="/group/requests/:id">
            <GroupRequests group={group} handleAdminResponse={handleAdminResponse} />
          </Route>

          <Route exact path="/group/settings/:id">
            <GroupSettings group={group} handleEditGroupSettings={handleEditGroupSettings} setEntryError={setEntryError} entryError={entryError} open={open}/>
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
