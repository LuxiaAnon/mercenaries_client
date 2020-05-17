import React from "react";
import "./HomeConnected.css";
import { Link } from "react-router-dom";

const HomeConnected = (props) => {
  return (
    <React.Fragment>
      <h1 className="choice-title">What's next?</h1>
      <section className="working-or-training">
        <div className="working">
          <div className="container-link">
            <Link to="/all-missions">Missions</Link>
          </div>
        </div>
        <div className="training">
          <div className="container-link">
            <Link to="/all-trainings">Trainings</Link>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default HomeConnected;
