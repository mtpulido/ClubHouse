import "./App.css";
import { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { signOut, verifyUser } from "./services/auth";
import LandingContainer from "./containers/LandingContainer"
import UserContainer from "./containers/UserContainer"
import GroupContainer from "./containers/GroupContainer"
import { getUser } from "./services/user"

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [toggleFetch, setToggleFetch] = useState(false)

  useEffect(() => {
    const handleVerify = async () => {
      const payload = await verifyUser();
      const user = await getUser(payload.id)
      setCurrentUser(user)
    };
    handleVerify();
  }, [toggleFetch]);
  // const handleSignOut = () => {
  //   setCurrentUser(null);
  //   localStorage.removeItem("token");
  //   signOut();
  //   history.push("/");
  // };

  return (
    <div className="app">
      <Switch>

      <Route path="/user">
          <UserContainer currentUser={currentUser} setCurrentUser={setCurrentUser} setToggleFetch={setToggleFetch}/>
        </Route>

        <Route path="/group">
          <GroupContainer setCurrentUser={setCurrentUser} currentUser={currentUser} setToggleFetch2={setToggleFetch}/>
        </Route>

        <Route path="/">
          <LandingContainer setCurrentUser={setCurrentUser} setToggleFetch={setToggleFetch}/>
        </Route>

      </Switch>
    </div>
  );
}

export default App;
