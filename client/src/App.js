import "./App.css";
import { useState, useEffect } from "react";
import { Route, useHistory, Switch } from "react-router-dom";
import { signOut, verifyUser } from "./services/auth";
import LandingContainer from "./containers/LandingContainer"
import UserContainer from "./containers/UserContainer"
import { getUser } from "./services/user"

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const history = useHistory();
  // const [toggleFetch, setToggleFetch] = useState(false)

  useEffect(() => {
    const handleVerify = async () => {
      const payload = await verifyUser();
      const user = await getUser(payload.id)
      setCurrentUser(user)
      // console.log("user has been updated")
    };
    handleVerify();
  }, []);
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
          <UserContainer currentUser={currentUser} setCurrentUser={setCurrentUser} />
        </Route>

        <Route path="/">
          <LandingContainer setCurrentUser={setCurrentUser} />
        </Route>

      </Switch>
    </div>
  );
}

export default App;
