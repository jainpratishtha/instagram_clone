import React, { useContext, useEffect, createContext, useReducer } from "react";
import NavBar from "./components/NavBar";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import Home from "./components/home";
import Login from "./components/login";
import Signup from "./components/signup";
import Profile from "./components/profile";
import CreatePost from "./components/createPost";
import UserProfile from "./components/UserProfile";
import FollowingPosts from "./components/followingPosts";

import { reducer, initialState } from "./reducers/userReducer";

export const UserContext = createContext();

const Routing = () => {
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "USER", payload: user });
      // history.push("/");
    } else {
      history.push("/login");
      // if(!history.location.pathname.startsWith('/reset'))
      //      history.push('/login')
    }
  }, []);
  return (
    <Switch>
      {/* switxh will make sure that atleast one route is active */}
      <Route exact path="/">
        {/* because / is in every route home compnent will be visible every where to acoid this put exact  */}
        <Home />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/signup">
        <Signup />
      </Route>
      <Route exact path="/profile">
        <Profile />
      </Route>
      <Route path="/createPost">
        <CreatePost />
      </Route>
      <Route path="/profile/:userid">
        <UserProfile />
      </Route>
      <Route path="/followingPosts">
        <FollowingPosts />
      </Route>
    </Switch>
  );
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <NavBar />
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
