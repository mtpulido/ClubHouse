import './App.css';
import { useState, useEffect } from "react"
import { Route, useHistory } from "react-router-dom"
import { signUp, signIn, signOut, verifyUser } from "./services/auth"
import SignIn from "./screens/signIn/SignIn"

function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const [credentialsError, setCredentialsError] = useState([])
  const history = useHistory();

  useEffect(() => {
    const handleVerify = async () => {
      const userData = await verifyUser()
      setCurrentUser(userData)
    }
    handleVerify()
  }, [])

  const handleSignIn = async (credentials) => {
    try {
      const userData = await signIn(credentials)
      setCurrentUser(userData)
      history.push('/dashboard')
    } catch (error) {
      console.log(error)
      setCredentialsError(error)
    }
  }
  
  const handleSignUp = async (credentials) => {
    try {
      const userData = await signUp(credentials)
      setCurrentUser(userData)
      history.push('/dashboard')
    } catch (error) {
      console.log("this is error",  error )
      setCredentialsError(error)
    }
  }

  const handleSignOut = () => {
    setCurrentUser(null);
    localStorage.removeItem("token");
    signOut();
    history.push('/')
  };

  return (
  <div className="app">
      <Route exact path="/">
        <SignIn handleSignUp={handleSignUp} handleSignIn={handleSignIn} setCredentialsError={setCredentialsError} credentialsError={credentialsError}/>
      </Route>
  </div>
  );
}

export default App;
