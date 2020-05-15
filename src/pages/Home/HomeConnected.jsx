import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

const HomeConnected = (props) => {
  return (
    <div>
      <Link to="/all-missions">Missions</Link>
      <Link to="/all-missions">Training</Link>
    </div>
  );
};

export default HomeConnected;
