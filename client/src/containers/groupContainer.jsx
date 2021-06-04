import NavBar from "../layout/NavBar";
import { Switch, Route, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { postGroup, getGroups, requestGroup } from "../services/group";
import React from "react";
import NewGroup from "../screens/newGroup/newGroup";
import OneGroup from "../screens/group/Group";
import FindGroup from "../screens/findGroup/FindGroup";

const GroupContainer = (props) => {
  const { currentUser, setCurrentUser, setToggleFetch2 } = props;
  const [entryError, setEntryError] = useState([]);
  const history = useHistory();
  const [group, setGroup] = useState({});
  const [findGroup, setFindGroup] = useState([]);
  const [toggleFetch, setToggleFetch] = useState(false);

  const handlePostGroup = async (groupData) => {
    setEntryError([]);
    try {
      const updatedUser = await postGroup(groupData);
      setCurrentUser(updatedUser);
      history.push("/user/dashboard");
      setToggleFetch2((curr) => !curr)
    } catch (error) {
      setEntryError(error);
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
      const group = await requestGroup(id);
      setToggleFetch((curr) => !curr);
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      <Switch>
        <NavBar currentUser={currentUser} group={group}>
          <Route exact path="/group/new/group">
            <NewGroup handlePostGroup={handlePostGroup} />
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

          <Route exact path="/group/:id">
            <OneGroup group={group} setGroup={setGroup} />
          </Route>
        </NavBar>
      </Switch>
    </>
  );
};

export default GroupContainer;
