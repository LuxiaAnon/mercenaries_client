import React, { Component } from "react";
import "./AllMissions.css";
import apiHandler from "../../api/apiHandler";

export class AllMissions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allMissions: [],
      selectedMissions: [],
      filter: { alignment: null, category: null, recommended_rank: null },
    };
    // this.handleChangeAlignment = this.handleChangeAlignment.bind(this);
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
    console.log(Object.entries(this.state.filter));
    console.log(this.state);

    return (
      <React.Fragment>
        <h1>All missions</h1>
        <section id="missions-list">
          <div className="filter-bar">
            <div>
              <p>Alignment</p>
              <select name="alignment" onChange={this.handleSelect}>
                <option value="All">All</option>
                <option value="Good">Good</option>
                <option value="Neutral">Neutral</option>
                <option value="Evil">Evil</option>
              </select>
            </div>
            <div>
              <p>Category</p>
              <select name="category" onChange={this.handleSelect}>
                <option value="All">All</option>
                <option value="Elimination">Elimination</option>
                <option value="Escort">Escort</option>
                <option value="Rescue">Rescue</option>
                <option value="Steal">Steal</option>
                <option value="Race">Race</option>
              </select>
            </div>
            <div>
              <p>Recommend rank</p>
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
            {/* <div>
              <p>Reward</p>
              <select name="reward" onChange={this.handleSelect}>
                <option value="All">All</option>
                <option value="500">Min 500₡</option>
                <option value="1000">Min 1000₡</option>
                <option value="5000">Min 5000₡</option>
                <option value="10000">Min 10000₡</option>
              </select>
            </div> */}
          </div>
          {filteredArray.map((mission, index) => (
            <article key={index} className="one-mission-card">
              <figure>
                <img src={mission.image} alt={mission.name} />
              </figure>
              <h4>{mission.name}</h4>
              <span>{mission.category}</span>
              <span>{mission.reward}₡</span>
            </article>
          ))}
        </section>
        <section id="map" className="map-part"></section>
      </React.Fragment>
    );
  }
}

export default AllMissions;
