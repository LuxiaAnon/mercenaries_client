import { withUser } from "../../components/Auth/withUser";
import { Link } from "react-router-dom";
import React, { Component } from "react";
import apiHandler from "../../api/apiHandler";
import "./Dashboard.css";

export class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeMissions: [],
      activeTrainings: [],
      finishedMissions: [],
      finishedTrainings: [],
      statPage: true,
      missionsPage: false,
      trainingsPage: false,
    };
    this.hundleSelect = this.hundleSelect.bind(this);
  }

  skillRating = (name) => {
    let lvlbox = [];
    for (let i = 1; i < 5; i++) {
      lvlbox.push(
        <div
          key={`${name}-${i}`}
          data-lvl={i}
          className={`skill onDashboard ${
            this.props.context.user.skills[name] >= i ? "fill" : ""
          }`}
          id={name}
        ></div>
      );
    }
    return lvlbox;
  };

  haveDrivingLicence = (name, source) => {
    return (
      <figure>
        <img
          className={`vehicule-picture onDashboard ${
            this.props.context.user.skills[name] === true ? "clicked" : ""
          }`}
          src={source}
          alt={name}
          // onClick={(e) => this.handleDrivingClick(e, name)}
        />
      </figure>
    );
  };

  hundleSelect(e, name) {
    console.log(name);
    if (name === "statPage") {
      this.setState({
        statPage: true,
        missionsPage: false,
        trainingsPage: false,
      });
    } else if (name === "missionsPage") {
      this.setState({
        statPage: false,
        missionsPage: true,
        trainingsPage: false,
      });
    } else if (name === "trainingsPage") {
      this.setState({
        statPage: false,
        missionsPage: false,
        trainingsPage: true,
      });
    }
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    let grenier = {};
    apiHandler
      .getAllMissions()
      .then((apiRes) => {
        grenier.activeMissions = apiRes.filter((mission) => {
          if (
            mission.participants &&
            mission.participants.includes(this.props.context.user._id)
          ) {
            return true;
          }
          return false;
        });
        grenier.finishedMissions = apiRes.filter((mission) => {
          if (
            mission.winner &&
            mission.winner === this.props.context.user._id
          ) {
            return true;
          }
          return false;
        });
        this.setState(grenier);
      })
      .catch((err) => console.log(err));
    apiHandler
      .getAllTrainings()
      .then((apiRes) => {
        grenier.activeTrainings = apiRes.filter((training) => {
          if (
            training.trainees &&
            training.trainees.includes(this.props.context.user._id)
          ) {
            return true;
          }
          return false;
        });
        grenier.finishedTrainings = apiRes.filter((training) => {
          if (
            training.previous_trainees &&
            training.previous_trainees.includes(this.props.context.user._id)
          ) {
            return true;
          }
          return false;
        });
        this.setState(grenier);
      })
      .catch((err) => console.log(err));
    grenier.isLoading = false;
  }

  render() {
    const mercernary = this.props.context.user;
    if (this.state.isLoading) return null;
    return (
      <React.Fragment>
        <nav className="dashboard-nav">
          <button onClick={(e) => this.hundleSelect(e, "statPage")}>
            My stats
          </button>
          <button onClick={(e) => this.hundleSelect(e, "missionsPage")}>
            My missions
          </button>
          <button onClick={(e) => this.hundleSelect(e, "trainingsPage")}>
            My trainings
          </button>
        </nav>

        <main className="Dashboard">
          <aside>
            <figure className="avatar-container">
              <h2 className="alias-dashboard">
                {mercernary.alias.toUpperCase()}
              </h2>
              <img src={mercernary.avatar} alt="" />
            </figure>
          </aside>

          {this.state.statPage && (
            <section className="dashboard-all-pages">
              <div>
                <section className="skills part">
                  <h3>Weapons:</h3>

                  <div className="weapons weapons-big-screen">
                    <div className="oneSkill">
                      <label htmlFor="pistols">Pistols </label>
                      {this.skillRating("pistols")}
                    </div>
                    <div className="oneSkill">
                      <label htmlFor="assault_rifles">Assault rifles </label>
                      {this.skillRating("assault_rifles")}
                    </div>
                    <div className="oneSkill">
                      <label htmlFor="sniper_rifles">Sniper rifles </label>
                      {this.skillRating("sniper_rifles")}
                    </div>
                    <div className="oneSkill">
                      <label htmlFor="hammer">Hammer </label>
                      {this.skillRating("hammer")}
                    </div>
                  </div>
                  <div className=" others-big-screen">
                    <div className="healthcare">
                      <h3>Healthcare:</h3>
                      <div className="oneSkill">
                        <label htmlFor="first_aid">First aid </label>
                        {this.skillRating("first_aid")}
                      </div>
                      <div className="oneSkill">
                        <label htmlFor="medic_crafting">Medic crafting </label>
                        {this.skillRating("medic_crafting")}
                      </div>
                    </div>
                    <div>
                      <h3>Stealth:</h3>
                      <div className="oneSkill">
                        <label htmlFor="hacking">Hacking </label>
                        {this.skillRating("hacking")}
                      </div>
                      <div className="oneSkill">
                        <label htmlFor="thievery">Thievery </label>
                        {this.skillRating("thievery")}
                      </div>
                    </div>
                  </div>
                </section>
                <section>
                  <div className="driving part">
                    <div className="licences">
                      <div>
                        {this.haveDrivingLicence("car", "media/images/car.jpg")}
                        <p>Car</p>
                      </div>
                      <div>
                        {this.haveDrivingLicence(
                          "mecha",
                          "media/images/mecha.jpg"
                        )}
                        <p>Mecha</p>
                      </div>
                      <div>
                        {this.haveDrivingLicence(
                          "spaceship",
                          "media/images/spaceship.jpg"
                        )}
                        <p>Spaceship</p>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
              <button>Update my profile</button>
            </section>
          )}
          {this.state.missionsPage && (
            <section className="dashboard-all-pages">
              <h3>My missions</h3>
              <div className="all-missions-cards">
                {this.state.activeMissions.map((mission, index) => (
                  <article key={index} className="one-mission-card">
                    <figure className="image-container">
                      <img src={mission.image} alt={mission.name} />
                    </figure>
                    <h4>{mission.name}</h4>
                    <span>{mission.category}</span>
                    <span className="right orange">{mission.reward}₡</span>

                    <button>Sending proof</button>
                  </article>
                ))}
              </div>

              <h3>My accomplished missions</h3>
              <div className="all-missions-cards">
                {this.state.finishedMissions.map((mission, index) => (
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
          )}
          {this.state.trainingsPage && (
            <section className="dashboard-all-pages">
              <h3>My trainings</h3>
              <div className="all-trainings-cards">
                {this.state.activeTrainings.map((training, index) => (
                  <article key={index} className="one-training-card">
                    <figure>
                      <Link to={`/training-details/${training._id}`}>
                        <img src={training.image} alt={training.name} />
                      </Link>
                    </figure>
                    <h4>{training.name}</h4>
                    <span>{training.category}</span>
                    <span className="right orange">{training.price}₡</span>
                  </article>
                ))}
              </div>
              <h3>My finished trainings</h3>
              <div className="all-missions-cards">
                {this.state.finishedTrainings.map((training, index) => (
                  <article key={index} className="one-training-card">
                    <figure>
                      <Link to={`/training-details/${training._id}`}>
                        <img src={training.image} alt={training.name} />
                      </Link>
                    </figure>
                    <h4>{training.name}</h4>
                    <span>{training.category}</span>
                    <span className="right orange">{training.price}₡</span>
                  </article>
                ))}
              </div>
            </section>
          )}
        </main>
      </React.Fragment>
    );
  }
}

export default withUser(Dashboard);
