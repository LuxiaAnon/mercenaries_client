import React, { Component } from "react";
import "./OneMission.css";
import apiHandler from "../../api/apiHandler.js";
import { withUser } from "../../components/Auth/withUser";

export class OneMission extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oneMission: null,
      participants: null,
      currentUser: this.props.context.user,
    };
    this.joinMission = this.joinMission.bind(this);
    this.hundleJoin = this.hundleJoin.bind(this);
  }

  joinMission(id, data) {
    apiHandler
      .updateAMission(id, data)
      .then((apiRes) => {
        console.log(apiRes.data);
      })
      .catch((err) => console.log(err));
  }

  hundleJoin() {
    const missionIid = this.state.oneMission._id;
    const mercenaryId = this.state.currentUser._id;
    this.setState({ participants: this.state.participants.push(mercenaryId) });
    console.log(this.state);
    this.joinMission(missionIid, this.state.oneMission);
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    apiHandler
      .getOneMission(id)
      .then((apiRes) => {
        this.setState({
          oneMission: apiRes,
          participants: apiRes.participants,
        });
      })
      .catch((err) => {});
  }

  render() {
    if (!this.state.oneMission) return null;
    return (
      <React.Fragment>
        <div>{this.state.oneMission.name} </div>
        <button onClick={(e) => this.hundleJoin()}>Go!</button>
      </React.Fragment>
    );
  }
}

export default withUser(OneMission);
