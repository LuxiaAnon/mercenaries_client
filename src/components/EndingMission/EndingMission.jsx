import React, { Component } from "react";
import apiHandler from "../../api/apiHandler";
import "./EndingMission.css";
import { withUser } from "../../components/Auth/withUser";

export class EndingMission extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timerOn: true,
      theMission: null,
      theUser: null,
    };
    this.finishTimer = this.finishTimer.bind(this);
    this.successOrFailure = this.successOrFailure.bind(this);
    this.clearTime = this.clearTime.bind(this);
    this.handleResult = this.handleResult.bind(this);
  }

  componentDidMount() {
    this.setState({ theMission: this.props.mission });
    this.setState({ theUser: this.props.context.user });
    this.setState({ result: Math.random() });
    console.log(this.state.result);
    let blabla = setTimeout(() => this.finishTimer(blabla), 2000);
  }

  finishTimer(timer) {
    this.setState({ timerOn: false });
    this.clearTime(timer);
    this.handleResult();
  }

  clearTime(timer) {
    clearTimeout(timer);
  }

  handleResult() {
    if (this.state.result > 0.9) {
      let newCash = this.state.theUser.cash + this.state.theMission.reward;
      let newXp =
        this.state.theUser.experience + this.state.theMission.gained_xp;
      let newHonor =
        this.state.theUser.honor + this.state.theMission.honor_points;
      this.setState({
        theUser: { ...this.state.theUser, cash: newCash },
      });
      this.setState({
        theUser: { ...this.state.theUser, honor: newHonor },
      });
      this.setState({
        theUser: { ...this.state.theUser, experience: newXp },
      });
      let newRank;
      if (newXp >= 0 && newXp <= 500) newRank = 1;
      else if (newXp >= 501 && newXp <= 1200) newRank = 2;
      else if (newXp >= 1201 && newXp <= 3000) newRank = 3;
      else if (newXp >= 3501 && newXp <= 5000) newRank = 4;
      else if (newXp >= 5001 && newXp <= 9000) newRank = 5;
      else if (newXp >= 9001) newRank = 6;
      this.setState({
        theUser: { ...this.state.theUser, rank: newRank },
      });
      console.log(this.state.theUser);
      apiHandler
        .updateUserCash(this.state.theUser._id, this.state.theUser)
        .then((apiRes) => {
          console.log(apiRes);
        })
        .catch((err) => {
          console.log(err);
        });
      let theWinner = this.state.theUser._id;
      this.setState({
        theMission: { ...this.state.theMission, winner: theWinner },
      });
      this.setState({
        theMission: { ...this.state.theMission, available: false },
      });
      apiHandler
        .updateAMission(this.state.theMission._id, this.state.theMission)
        .then((apiRes) => {
          console.log(apiRes);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      let losers = [...this.state.theMission.previous_participants];
      losers.push(this.state.theUser._id);
      this.setState({
        theMission: {
          ...this.state.theMission,
          previous_participants: losers,
        },
      });
      apiHandler
        .updateAMission(this.state.theMission._id, this.state.theMission)
        .then((apiRes) => {
          console.log(apiRes);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  successOrFailure() {
    if (this.state.result > 0.9) {
      return (
        <React.Fragment>
          <h1 className="succes">SUCCES</h1>
          <p className="creditAmount">
            You've been credited of {this.state.theMission.reward}₡
          </p>
        </React.Fragment>
      );
    } else {
      return <h1 className="failure">FAILURE</h1>;
    }
  }

  render() {
    console.log(this.state);
    return (
      <React.Fragment>
        {this.state.timerOn && (
          <div className="sendingProof">
            <h1>ANALYSING</h1>
            <div className="lds-facebook">
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        )}
        {!this.state.timerOn && (
          <div className="sendingProof">
            <div>{this.successOrFailure()}</div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default withUser(EndingMission);