import React, { useState, useCallback, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { AuthContext } from "./context/auth-context";

import "./App.css";

import NavBar from "./layouts/NavBar";
import HomeScreen from "./pages/HomeScreen";
import SignUpTeacher from "./pages/auth/SignUpTeacher";
import LoginTeacher from "./pages/auth/LoginTeacher";
import LoginAs from "./pages/auth/LoginAs";
import LoginStudent from "./pages/auth/LoginStudent";
import SignUpStudent from "./pages/auth/SignUpStudent";
import DashBoardFront from "./pages/dashboard/DashBoardFront";
import CreateCourse from "./pages/dashboard/CreateCourse";
import ViewCourses from "./pages/dashboard/ViewCourses";
import EditCourse from "./pages/dashboard/EditCourse";

export default function App() {
  const [token, setToken] = useState();
  const [name, setName] = useState();
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const login = useCallback((name, token, user) => {
    setToken(token);
    setName(name);
    setUser(user);

    localStorage.setItem(
      "userData",
      JSON.stringify({
        name: name,
        token: token,
        user: user,
      })
    );

    console.log("auto logged in" + user + " " + token);

    setIsLoading(false);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setName(null);
    setUser(null);

    localStorage.removeItem("userData");
    localStorage.clear();
    return <Redirect to={"/login"} />;
  }, []);

  // automatic login at start up (using local storage)
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (storedData && storedData.token) {
      login(storedData.name, storedData.token, storedData.user);
    }
    setIsLoading(false);
    console.log(user);
  }, [login]);

  let reactRoutes;
  if (token && !isLoading && user.role == "Student") {
    reactRoutes = (
      <React.Fragment>
        <Route path="/">
          <NavBar></NavBar>
        </Route>

        <Switch>
          <Route path="/" exact>
            <HomeScreen></HomeScreen>
          </Route>
          {/* <Route path="/make-payments" exact>
            <MakePayment></MakePayment>
          </Route> */}

          {/*  <Route path="/logout" exact>
            <Logout></Logout>
          </Route> */}
          <Redirect to="/" />
        </Switch>
      </React.Fragment>
    );
  } else if (token && !isLoading && user.role == "Teacher") {
    reactRoutes = (
      <React.Fragment>
        <Route path="/">
          <NavBar></NavBar>
        </Route>

        <Switch>
          <Route path="/dashboard" exact>
            <DashBoardFront></DashBoardFront>
          </Route>
          <Route path="/create-course" exact>
            <CreateCourse></CreateCourse>
          </Route>
          <Route path="/view-courses" exact>
            <ViewCourses></ViewCourses>
          </Route>
          <Route path="/update-course/:cid" exact>
            <EditCourse></EditCourse>
          </Route>
          {/* <Route path="/make-payments" exact>
            <MakePayment></MakePayment>
          </Route> */}

          {/*  <Route path="/logout" exact>
            <Logout></Logout>
          </Route> */}
          <Redirect to="/dashboard" />
        </Switch>
      </React.Fragment>
    );
  } else {
    reactRoutes = (
      <React.Fragment>
        <Route path="/">
          <NavBar></NavBar>
        </Route>
        <Switch>
        <Route path="/" exact>
            <HomeScreen></HomeScreen>
          </Route>
          <Route path="/login-as" exact>
            <LoginAs></LoginAs>
          </Route>
          <Route path="/login-teacher" exact>
            <LoginTeacher></LoginTeacher>
          </Route>
          <Route path="/signup-teacher" exact>
            <SignUpTeacher></SignUpTeacher>
          </Route>
          <Route path="/login-student" exact>
            <LoginStudent></LoginStudent>
          </Route>
          <Route path="/signup-student" exact>
            <SignUpStudent></SignUpStudent>
          </Route>
          
        </Switch>
      </React.Fragment>
    );
  }
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        name: name,
        user: user,
        login: login,
        logout: logout,
      }}
    >
      {!isLoading && <Router>{reactRoutes}</Router>}
    </AuthContext.Provider>
  );
}
