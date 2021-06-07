import "./App.css";
import { useState, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { signOut, verifyUser } from "./services/auth";
import LandingContainer from "./containers/LandingContainer";
import UserContainer from "./containers/userContainer";
import GroupContainer from "./containers/groupContainer";
import { getUser } from "./services/user";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [toggleFetch, setToggleFetch] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const handleVerify = async () => {
      const payload = await verifyUser();
      const user = await getUser(payload.id);
      setCurrentUser(user);
    };
    handleVerify();
  }, [toggleFetch]);

  return (
    <div className="app">
      <Switch>
        <Route path="/user">
          <UserContainer
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            setToggleFetch={setToggleFetch}
          />
        </Route>

        <Route path="/group">
          <GroupContainer
            setCurrentUser={setCurrentUser}
            currentUser={currentUser}
            setToggleFetch2={setToggleFetch}
          />
        </Route>

        <Route path="/">
          <LandingContainer
            setCurrentUser={setCurrentUser}
            setToggleFetch={setToggleFetch}
          />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
