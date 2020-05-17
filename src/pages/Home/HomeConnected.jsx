import React from "react";
import "./HomeConnected.css";
import { Link } from "react-router-dom";

const HomeConnected = (props) => {
  return (
    <React.Fragment>
      <h1 className="choice-title">Working or training?</h1>
      <div>
        {/* <Link to="/all-missions">Missions</Link>
        <Link to="/all-trainings">Training</Link> */}
        {/* <Link to="/all-missions">Missions</Link>
        <Link to="/all-trainings">Training</Link> */}
      </div>
      <div className="round-menu">
        <Link to="/all-missions">Missions</Link>
        <Link to="/all-trainings">Training</Link>
      </div>
      <div>
        {/* <Link to="/all-missions">Missions</Link>
        <Link to="/all-trainings">Training</Link> */}
        {/* <Link to="/all-missions">Missions</Link>
        <Link to="/all-trainings">Training</Link> */}
      </div>
    </React.Fragment>
  );
};

//mets les catégories en cachées et fais les apparaître lorsque tu cliques dessus ! :D

export default HomeConnected;
