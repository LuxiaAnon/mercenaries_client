import React, { Component } from "react";
import apiHandler from "../../api/apiHandler";

import { withUser } from "../../components/Auth/withUser";
import { withRouter } from "react-router-dom";

export class EndingTraining extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timerOn: true,
      theTraining: null,
      isLoading: true,
      // theUser: null,
    };
    this.finishTimer = this.finishTimer.bind(this);
    this.clearTime = this.clearTime.bind(this);
    this.handleTraining = this.handleTraining.bind(this);
  }

  componentDidMount() {
    apiHandler
      .getOneTraining(this.props.training._id)
      .then((apiRes) => {
        this.setState({ theTraining: apiRes });
      })
      .catch((err) => console.log(err));

    apiHandler
      .getOneUser(this.props.context.user._id)
      .then((apiRes) => {
        console.log(apiRes);
        const updatedUser = { ...apiRes };
        this.setState({
          cash: updatedUser.cash,
          skills: {
            ...this.state.skills,
            pistols: updatedUser.skills.pistols,
            assault_rifles: updatedUser.skills.assault_rifles,
            sniper_rifles: updatedUser.skills.sniper_rifles,
            hammer: updatedUser.skills.hammer,
            first_aid: updatedUser.skills.first_aid,
            medic_crafting: updatedUser.skills.medic_crafting,
            hacking: updatedUser.skills.hacking,
            thievery: updatedUser.skills.thievery,
            car: updatedUser.skills.car,
            mecha: updatedUser.skills.mecha,
            spaceship: updatedUser.skills.spaceship,
          },
          isLoading: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });

    let blabla = setTimeout(() => this.finishTimer(blabla), 4000);
  }

  finishTimer(timer) {
    this.setState({ timerOn: false });
    this.clearTime(timer);
    this.handleTraining();
  }

  clearTime(timer) {
    clearTimeout(timer);
  }

  buildFormData = (formData, data, parentKey) => {
    if (
      data &&
      typeof data === "object" &&
      !(data instanceof Date) &&
      !(data instanceof File)
    ) {
      Object.keys(data).forEach((key) => {
        this.buildFormData(
          formData,
          data[key],
          parentKey ? `${parentKey}[${key}]` : key
        );
      });
    } else {
      const value = data == null ? "" : data;
      formData.append(parentKey, value);
    }
  };

  handleTraining() {
    let newCash = this.state.cash - this.state.theTraining.price;
    this.setState({ cash: newCash });
    switch (this.state.theTraining.skill_learned) {
      case "pistols":
        this.setState({
          skills: {
            ...this.state.skills,
            pistols: this.state.skills.pistols + 1,
          },
        });
        break;
      case "assault_rifles":
        this.setState({
          skills: {
            ...this.state.skills,
            assault_rifles: this.state.skills.assault_rifles + 1,
          },
        });
        break;
      case "sniper_rifles":
        this.setState({
          skills: {
            ...this.state.skills,
            sniper_rifles: this.state.skills.sniper_rifles + 1,
          },
        });
        break;
      case "hammer":
        this.setState({
          skills: {
            ...this.state.skills,
            hammer: this.state.skills.hammer + 1,
          },
        });
        break;
      case "first_aid":
        this.setState({
          skills: {
            ...this.state.skills,
            first_aid: this.state.skills.first_aid + 1,
          },
        });
        break;
      case "medic_crafting":
        this.setState({
          skills: {
            ...this.state.skills,
            medic_crafting: this.state.skills.medic_crafting + 1,
          },
        });
        break;
      case "hacking":
        this.setState({
          skills: {
            ...this.state.skills,
            thievery: this.state.skills.thievery + 1,
          },
        });
        break;
      case "car":
        this.setState({
          skills: {
            ...this.state.skills,
            car: true,
          },
        });
        break;
      case "mecha":
        this.setState({
          skills: {
            ...this.state.skills,
            mecha: true,
          },
        });
        break;
      case "spaceship":
        this.setState({
          skills: {
            ...this.state.skills,
            spaceship: true,
          },
        });
        break;
      default:
        console.log("oups");
    }

    const fd = new FormData();
    this.buildFormData(fd, this.state);

    let previousTrainee = [...this.state.theTraining.previous_trainees];
    previousTrainee.push(this.props.context.user._id);
    this.setState({
      theTraining: {
        ...this.state.theTraining,
        previous_trainees: previousTrainee,
      },
    });

    apiHandler.updateAUser(this.props.context.user._id, fd).then((apiRes) => {
      console.log(apiRes);
      this.props.context.setUser(apiRes);
    });
    apiHandler
      .updateATraining(this.state.theTraining._id, this.state.theTraining)
      .then((apiRes) => {
        const { handleTraining } = this.props;
        handleTraining(this.state.theTraining);
      })
      .catch((err) => console.log(err))
      .catch((err) => console.log(err));
  }

  render() {
    if (this.state.isLoading) return null;
    return (
      <React.Fragment>
        {this.state.timerOn && (
          <div className="sendingProof">
            <h1>TRAINING</h1>
            <div className="lds-facebook">
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        )}
        {!this.state.timerOn && (
          <div className="sendingProof">
            <h2 style={{ color: "var(--success)", marginBottom: "2vh" }}>
              CONGRATS
            </h2>
            <div>
              Your skill level has been updated and your bank account debited of{" "}
              {this.state.theTraining.price}₡
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default withRouter(withUser(EndingTraining));
