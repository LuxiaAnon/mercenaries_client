import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withUser } from "../../components/Auth/withUser";
import "./AllMissions.css";
import apiHandler from "../../api/apiHandler";
import WrappedMap from "../../components/WrappedMap";

export class AllMissions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allMissions: [],
      selectedMissions: [],
      filter: { alignment: null, category: null, recommended_rank: null },
    };
  }

  componentDidMount() {
    apiHandler
      .getAllMissions()
      .then((apiRes) => {
        this.setState({ selectedMissions: apiRes, allMissions: apiRes });
      })
      .catch((apiErr) => {
        console.log(apiErr);
      });
  }

  // Works only for one filter otherwise there are conflicts
  //   handleChangeAlignment(e) {
  //     let value = e.target.value;
  //     if (value === "All") {
  //       this.setState({ selectedMissions: this.state.allMissions });
  //     } else {
  //       let filteredArray = [...this.state.allMissions].filter(
  //         (mission) => mission.alignment === value
  //       );
  //       this.setState({ selectedMissions: filteredArray });
  //     }
  //   }

  handleSelect = (e) => {
    if (e.target.value === "All") {
      this.setState({
        filter: { ...this.state.filter, [e.target.name]: null },
      });
      return;
    }
    this.setState({
      filter: { ...this.state.filter, [e.target.name]: e.target.value },
    });
  };

  render() {
    const filteredArray = [...this.state.allMissions].filter((mission) => {
      for (let filter in this.state.filter) {
        if (
          this.state.filter[filter] &&
          mission[filter] !== this.state.filter[filter]
        ) {
          return false;
        }
      }
      return true;
    });

    return (
      <React.Fragment>
        <h1 id="missions-list">ALL MISSIONS</h1>
        <div className="header-all-missions">
          <a className="links-missions-pages" href="#map-missions">
            See on the map
          </a>

          <div className="filter-bar">
            <div>
              <p>Alignment: </p>
              <div className="custom-select">
                <select name="alignment" onChange={this.handleSelect}>
                  <option value="All">All</option>
                  <option value="Good">Good</option>
                  <option value="Neutral">Neutral</option>
                  <option value="Evil">Evil</option>
                </select>
              </div>
            </div>
            <div>
              <p>Category: </p>
              <div className="custom-select">
                <select name="category" onChange={this.handleSelect}>
                  <option value="All">All</option>
                  <option value="Elimination">Elimination</option>
                  <option value="Escort">Escort</option>
                  <option value="Rescue">Rescue</option>
                  <option value="Steal">Steal</option>
                  <option value="Race">Race</option>
                </select>
              </div>
            </div>
            <div>
              <p>Recommend rank: </p>
              <div className="custom-select">
                <select name="recommended_rank" onChange={this.handleSelect}>
                  <option value="All">All</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <section className="missions-list">
          <div className="all-missions-cards">
            {filteredArray.map((mission, index) => (
              <article key={index} className="one-mission-card">
                <figure className="image-container">
                  <Link to={`/mission-details/${mission._id}`}>
                    <img src={mission.image} alt={mission.name} />
                  </Link>
                </figure>
                <h4>{mission.name}</h4>
                <span>{mission.category}</span>
                <span className="right orange">{mission.reward}₡</span>
              </article>
            ))}
          </div>
        </section>
        <section id="map-missions" className="map-part">
          <a className="links-missions-pages" href="#missions-list">
            Go back to the missions list
          </a>
          <WrappedMap
            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
            loadingElement={<div style={{ height: "100%" }} />}
            containerElement={<div style={{ height: "100%" }} />}
            mapElement={<div style={{ height: "100%" }} />}
            events={filteredArray}
          />
        </section>
      </React.Fragment>
    );
  }
}

export default withUser(AllMissions);
