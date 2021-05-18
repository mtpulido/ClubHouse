import "./App.css";
import { useState, useEffect } from "react";
import { Route, useHistory, Switch } from "react-router-dom";
import { signUp, signIn, signOut, verifyUser } from "./services/auth";
import SignUp from "./screens/signUp/SignUp";
import Landing from "./screens/landingPage/Landing";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [credentialsError, setCredentialsError] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const handleVerify = async () => {
      const userData = await verifyUser();
      setCurrentUser(userData);
    };
    handleVerify();
  }, []);

  const handleSignIn = async (credentials) => {
    try {
      const userData = await signIn(credentials);
      setCurrentUser(userData);
      history.push("/dashboard");
    } catch (error) {
      setCredentialsError(error);
    }
  };

  const handleSignUp = async (credentials) => {
    try {
      const userData = await signUp(credentials);
      setCurrentUser(userData);
      history.push("/dashboard");
    } catch (error) {
      setCredentialsError(error);
    }
  };

  const handleSignOut = () => {
    setCurrentUser(null);
    localStorage.removeItem("token");
    signOut();
    history.push("/");
  };

  return (
    <div className="app">
      <Switch>
        <Route exact path="/">
          <Landing />
        </Route>

        <Route exact path="/sign-up">
          <SignUp
            handleSignUp={handleSignUp}
            handleSignIn={handleSignIn}
            setCredentialsError={setCredentialsError}
            credentialsError={credentialsError}
          />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
