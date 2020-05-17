import React, { Component } from "react";
import apiHandler from "../../api/apiHandler";
import "./AllTrainings.css";
import WrappedMap from "../../components/WrappedMap";

export class AllTrainings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allTrainings: [],
      selectedTrainings: [],
      filter: { alignment: null, category: null, recommended_rank: null },
    };
  }
  // permet le chargement des données de l'API dans le state de la classe
  componentDidMount() {
    apiHandler
      .getAllTrainings()
      .then((apiRes) => {
        this.setState({ selectedTrainings: apiRes, allTrainings: apiRes });
        console.log(apiRes);
      })
      .catch((err) => {
        console.log(err);
      });
  }

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
    const filteredArray = [...this.state.allTrainings].filter((training) => {
      for (let filter in this.state.filter) {
        if (
          this.state.filter[filter] &&
          training[filter] !== this.state.filter[filter]
        ) {
          return false;
        }
      }
      return true;
    });
    console.log(this.state);
    console.log(filteredArray);

    return (
      <React.Fragment>
        <h1 id="missions-list">All trainings</h1>
        <section className="trainings-list">
          <a href="#trainings-map">See on the map</a>
          <div className="filter-bar">
            <div>
              <p>Category</p>
              <select name="category" onChange={this.handleSelect}>
                <option value="All">All</option>
                <option value="Weapons">Weapons</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Stealth">Stealth</option>
                <option value="Driving">Driving</option>
              </select>
            </div>
            <div>
              <p>required_level</p>
              <select name="required_level" onChange={this.handleSelect}>
                <option value="All">All</option>
                <option value="0">Novice</option>
                <option value="1">Apprentice</option>
                <option value="2">Adept</option>
                <option value="3">Expert</option>
              </select>
            </div>
          </div>
          {filteredArray.map((training, index) => (
            <article key={index} className="one-training-card">
              <figure>
                <img src={training.image} alt={training.name} />
              </figure>
              <h4>{training.name}</h4>
              <span>{training.category}</span>
              <span>{training.price}₡</span>
            </article>
          ))}
        </section>
        <section id="map" className="map-part">
          <a href="#trainings-list">Go back to the missions list</a>
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

export default AllTrainings;
