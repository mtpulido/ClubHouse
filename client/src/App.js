import "./App.css";
import { useState, useEffect } from "react";
import { Route, useHistory, Switch } from "react-router-dom";
import { signOut, verifyUser } from "./services/auth";
import LandingContainer from "./containers/LandingContainer"

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const handleVerify = async () => {
      const userData = await verifyUser();
      setCurrentUser(userData);
    };
    handleVerify();
  }, []);

  const handleSignOut = () => {
    setCurrentUser(null);
    localStorage.removeItem("token");
    signOut();
    history.push("/");
  };

  return (
    <div className="app">
      <Switch>
        <Route path="/">
          <LandingContainer setCurrentUser={setCurrentUser} />
        </Route>
        
      </Switch>
    </div>
  );
}

export default App;
