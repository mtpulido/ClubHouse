import { useState } from "react";
import { Route, useHistory, Switch } from "react-router-dom";
import { signUp, signIn } from "../services/auth";
import SignUp from "../screens/signUp/SignUp";
import SignIn from "../screens/signIn/SignIn";
import Landing from "../screens/landingPage/Landing";

const LandingContainer = (props) => {
  const { setCurrentUser, setToggleFetch } = props;
  const [credentialsError, setCredentialsError] = useState([]);
  const history = useHistory();

  const handleSignIn = async (credentials) => {
    try {
      const userData = await signIn(credentials);
      setCurrentUser(userData);
      history.push("/user/dashboard");
      setToggleFetch((curr) => !curr);
    } catch (error) {
      setCredentialsError(error);
    }
  };

  const handleSignUp = async (credentials) => {
    try {
      const userData = await signUp(credentials);
      setCurrentUser(userData);
      history.push("/user/dashboard");
      setToggleFetch((curr) => !curr);
    } catch (error) {
      setCredentialsError(error);
    }
  };

  return (
    <>
      <Switch>
        <Route path="/sign-up">
          <SignUp
            handleSignUp={handleSignUp}
            setCredentialsError={setCredentialsError}
            credentialsError={credentialsError}
          />
        </Route>

        <Route path="/sign-in">
          <SignIn
            handleSignIn={handleSignIn}
            setCredentialsError={setCredentialsError}
            credentialsError={credentialsError}
          />
        </Route>

        <Route exact path="/">
          <Landing />
        </Route>
      </Switch>
    </>
  );
};

export default LandingContainer;
