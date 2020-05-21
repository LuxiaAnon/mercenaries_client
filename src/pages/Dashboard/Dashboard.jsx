import { withUser } from "../../components/Auth/withUser";
import { Link } from "react-router-dom";
import React, { Component } from "react";
import apiHandler from "../../api/apiHandler";
import "./Dashboard.css";
import Modal from "react-modal";
import EndingMission from "../../components/EndingMission/EndingMission";
import EndingTraining from "../../components/EndingTraining/EndingTraining";
import { withRouter } from "react-router-dom";
import DeleteUser from "../../components/DeleteUser/DeleteUser";

export class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allMissions: [],
      allTrainings: [],
      activeMissions: [],
      activeTrainings: [],
      finishedMissions: [],
      finishedTrainings: [],
      statPage: true,
      missionsPage: false,
      trainingsPage: false,
      modalMissionIsOpen: null,
      modalTrainingIsOpen: null,
      modalDeleteIsOpen: false,
    };
    this.hundleSelect = this.hundleSelect.bind(this);
    this.handleMission = this.handleMission.bind(this);
    this.filterHandler = this.filterHandler.bind(this);
    this.deleteUser = this.deleteUser.bind(this);

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

    this.openTrainingModal = this.openTrainingModal.bind(this);
    this.closeModalTraining = this.closeModalTraining.bind(this);

    this.openDeleteModal = this.openDeleteModal.bind(this);
    this.closeModalDelete = this.closeModalDelete.bind(this);
  }

  handleMission(mission) {
    let allMissions = [...this.state.allMissions];
    let index = allMissions.indexOf(
      allMissions.find((x) => x._id === mission._id)
    );
    allMissions[index] = mission;
    this.setState({ allMissions: allMissions });
    this.filterHandler();
  }

  openModal(index) {
    this.setState({ modalMissionIsOpen: index });
  }
  closeModal() {
    this.setState({ modalMissionIsOpen: null });
  }
  openTrainingModal(index) {
    this.setState({ modalTrainingIsOpen: index });
  }

  closeModalTraining() {
    console.log("je suis le la fermeture de modal training");
    this.setState({ modalTrainingIsOpen: null });
  }

  openDeleteModal() {
    this.setState({ modalDeleteIsOpen: true });
  }

  closeModalDelete() {
    this.setState({ modalDeleteIsOpen: false });
  }

  deleteUser() {
    apiHandler
      .deleteAUser(this.props.context.user._id)
      .then((apiRes) => {
        console.log(apiRes);
        this.props.context.removeUser();
        this.props.history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
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
    apiHandler.getAllMissions().then((apiRes) => {
      this.setState({ allMissions: apiRes });
    });
    apiHandler
      .getAllTrainings()
      .then((apiRes) => {
        this.setState({ allTrainings: apiRes });
        this.filterHandler();
      })
      .catch((err) => console.log(err))

      .catch((err) => console.log(err));
  }

  filterHandler() {
    console.log(this.state.allMissions);
    let allMissions = [...this.state.allMissions];
    let allTrainings = [...this.state.allTrainings];
    this.setState({ isLoading: true });
    this.setState({
      activeMissions: allMissions.filter((mission) => {
        if (
          mission.participants &&
          mission.participants.includes(this.props.context.user._id) &&
          !mission.previous_participants.includes(
            this.props.context.user._id
          ) &&
          mission.available &&
          mission.winner !== this.props.context.user._id
        ) {
          return true;
        }
        return false;
      }),
      finishedMissions: allMissions.filter((mission) => {
        if (mission.winner && mission.winner === this.props.context.user._id) {
          return true;
        }
        return false;
      }),
      activeTrainings: allTrainings.filter((training) => {
        if (
          training.trainees &&
          training.trainees.includes(this.props.context.user._id) &&
          !training.previous_trainees.includes(this.props.context.user._id)
        ) {
          return true;
        }
        return false;
      }),
      finishedTrainings: allTrainings.filter((training) => {
        if (
          training.previous_trainees &&
          training.previous_trainees.includes(this.props.context.user._id)
        ) {
          return true;
        }
        return false;
      }),
      isLoading: false,
    });
  }

  render() {
    const customStyles = {
      content: {
        backgroundColor: "var(--darkBlue)",
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        transform: "translate(-50%, -50%)",
      },
    };
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
              <div className="info-container">
                <p>Rank: {mercernary.rank}</p>
                <p>Honor: {mercernary.honor}</p>
                <p>Bank: {mercernary.cash}₡</p>
              </div>
              {/* <p>Rank: {mercernary.rank}</p> */}
            </figure>
          </aside>

          {this.state.statPage && (
            <section className="dashboard-all-pages">
              <div className="signup">
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
                      </div>
                      <div>
                        {this.haveDrivingLicence(
                          "mecha",
                          "media/images/mecha.jpg"
                        )}
                      </div>
                      <div>
                        {this.haveDrivingLicence(
                          "spaceship",
                          "media/images/spaceship.jpg"
                        )}
                      </div>
                    </div>
                  </div>
                </section>
                <section className="buttons">
                  <Link to="/update-my-profile">
                    <button className="update-button">Update my profile</button>
                  </Link>

                  <button
                    onClick={() => this.openDeleteModal()}
                    className="delete-button"
                  >
                    Delete my account
                  </button>

                  <Modal
                    isOpen={this.state.modalDeleteIsOpen}
                    style={customStyles}
                    overlayClassName="Overlay"
                  >
                    <DeleteUser user={this.context.user} />
                    <button
                      style={{
                        border: "none",
                        backgroundColor: "var(--fail)",
                        color: "var(--almostWhite)",
                        fontFamily: "Cairo,sans-serif",
                        marginRight: "2vw",
                        width: "20%",
                        borderRadius: "5px",
                      }}
                      onClick={this.deleteUser}
                    >
                      OK
                    </button>
                    <button
                      style={{
                        border: "none",
                        backgroundColor: "var(--almostWhite)",
                        color: "var(--darkBlue)",
                        fontFamily: "Cairo,sans-serif",
                        width: "20%",
                        borderRadius: "5px",
                      }}
                      onClick={this.closeModalDelete}
                    >
                      No
                    </button>
                  </Modal>
                </section>
              </div>
            </section>
          )}
          {this.state.missionsPage && (
            <section className="dashboard-all-pages">
              <h3 className="title-dashboard">MY MISSIONS</h3>
              <div className="all-missions-cards onDashboard">
                {this.state.activeMissions.map((mission, index) => (
                  <article key={index} className="one-mission-card">
                    <figure className="image-container">
                      <img src={mission.image} alt={mission.name} />
                    </figure>
                    <h4>{mission.name}</h4>
                    <span>{mission.category}</span>
                    <span className="right orange">{mission.reward}₡</span>
                    <br />
                    <button
                      onClick={() => this.openModal(index)}
                      style={{
                        border: "none",
                        marginTop: "1vh",
                        backgroundColor: "var(--almostWhite)",
                        color: "var(--darkBlue)",
                        fontFamily: "Cairo,sans-serif",
                        width: "fit-content",
                        borderRadius: "5px",
                      }}
                    >
                      Sending proof
                    </button>
                    <Modal
                      isOpen={this.state.modalMissionIsOpen === index}
                      style={customStyles}
                      overlayClassName="Overlay"
                    >
                      <EndingMission
                        mission={mission}
                        user={this.context.user}
                        handleMission={this.handleMission}
                      />

                      <button
                        // onClick={(this.refreshPage, this.closeModal)}
                        onClick={this.closeModal}
                      >
                        OK
                      </button>
                    </Modal>
                  </article>
                ))}
              </div>

              <h3 className="title-dashboard">MY ACCOMPLISHED MISSIONS</h3>
              <div className="all-missions-cards onDashboard">
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
              <h3 className="title-dashboard">MY TRAININGS</h3>
              <div className="all-trainings-cards height">
                {this.state.activeTrainings.map((training, index) => (
                  <article key={index} className="one-training-card">
                    <figure>
                      <Link to={`/training-details/${training._id}`}>
                        <img src={training.image} alt={training.name} />
                      </Link>
                    </figure>
                    <h4>{training.name}</h4>
                    <br />
                    <span>{training.category}</span>
                    <span className="right orange">{training.price}₡</span>
                    <br />
                    {this.props.context.user.cash >= training.price && (
                      <React.Fragment>
                        <button
                          onClick={() => this.openTrainingModal(index)}
                          style={{
                            border: "none",
                            marginTop: "1vh",
                            backgroundColor: "var(--almostWhite)",
                            color: "var(--darkBlue)",
                            fontFamily: "Cairo,sans-serif",
                            width: "fit-content",
                            borderRadius: "5px",
                          }}
                        >
                          Train
                        </button>
                        <Modal
                          isOpen={this.state.modalTrainingIsOpen === index}
                          style={customStyles}
                          overlayClassName="Overlay"
                        >
                          <EndingTraining
                            training={training}
                            // user={this.context.user}
                          />

                          <button
                            // onClick={(this.refreshPage, this.closeModal)}
                            onClick={this.closeModalTraining}
                          >
                            OK
                          </button>
                        </Modal>
                      </React.Fragment>
                    )}
                    {this.props.context.user.cash < training.price && (
                      <p className="too-poor">
                        You can't afford this training.
                      </p>
                    )}
                  </article>
                ))}
              </div>
              {/* <h3>My finished trainings</h3>
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
              </div> */}
            </section>
          )}
        </main>
      </React.Fragment>
    );
  }
}

export default withRouter(withUser(Dashboard));
