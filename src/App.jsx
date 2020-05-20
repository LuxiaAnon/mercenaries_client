import React from "react";
import { Switch, Route } from "react-router-dom";
import NavMain from "./components/NavMain/NavMain";
import Home from "./pages/Home/Home";
import Signup from "./pages/Signup/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard/Dashboard";
import AllMissions from "./pages/AllMissions/AllMissions";
import AllTrainings from "./pages/AllTrainings/AllTrainings";
import "./styles/app.css";
import OneMission from "./pages/OneMission/OneMission";
import OneTraining from "./pages/OneTraining/OneTraining";
import UpdateProfile from "./pages/UpdateProfile/UpdateProfile";

function App() {
  return (
    <div className="App">
      <NavMain />
      <Switch>
        <Route exact path="/" component={Home} />
        {/* <Route exact path="/signin" component={Signin} /> */}
        <Route exact path="/signup" component={Signup} />
        <ProtectedRoute exact path="/all-missions" component={AllMissions} />
        <ProtectedRoute
          exact
          path="/mission-details/:id"
          component={OneMission}
        />
        <ProtectedRoute
          exact
          path="/training-details/:id"
          component={OneTraining}
        />
        <ProtectedRoute exact path="/all-trainings" component={AllTrainings} />
        <ProtectedRoute exact path="/dashboard" component={Dashboard} />
        <ProtectedRoute
          exact
          path="/update-my-profile"
          component={UpdateProfile}
        />
      </Switch>
    </div>
  );
}

export default App;
