import React from "react";
import { Switch, Route } from "react-router-dom";
import NavMain from "./components/NavMain/NavMain";
import Home from "./pages/Home/Home";
// import Signin from "./components/Signin";
import Signup from "./pages/Signup/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard/Dashboard";
import AllMissions from "./pages/AllMissions/AllMissions";
import AllTrainings from "./pages/AllTrainings/AllTrainings";
import "./styles/app.css";

function App() {
  return (
    <div className="App">
      <NavMain />
      <Switch>
        <Route exact path="/" component={Home} />
        {/* <Route exact path="/signin" component={Signin} /> */}
        <Route exact path="/signup" component={Signup} />
        <ProtectedRoute exact path="/all-missions" component={AllMissions} />
        <ProtectedRoute exact path="/all-trainings" component={AllTrainings} />
        <ProtectedRoute exact path="/dashboard" component={Dashboard} />
      </Switch>
    </div>
  );
}

export default App;
