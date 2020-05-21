import React, { Component } from "react";
import "./OneMission.css";
import apiHandler from "../../api/apiHandler.js";
import { withUser } from "../../components/Auth/withUser";
import WrappedMap from "../../components/WrappedMap";
import { withRouter } from "react-router-dom";

export class OneMission extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oneMission: null,
      participants: null,
    };
    this.joinMission = this.joinMission.bind(this);
    this.hundleJoin = this.hundleJoin.bind(this);
  }

  joinMission(id, data) {
    apiHandler
      .updateAMission(id, data)
      .then((apiRes) => {
        console.log(apiRes.data);
        this.props.history.goBack();
      })
      .catch((err) => console.log(err));
  }

  hundleJoin() {
    const missionIid = this.state.oneMission._id;
    const mercenaryId = this.props.context.user._id;

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
        <section>
          <figure className="image-mission">
            <img
              src={this.state.oneMission.image}
              alt={this.state.oneMission.name}
            />
          </figure>
          <article className="infos-mission">
            <h2>{this.state.oneMission.name} </h2>
            <div>
              <p>
                <strong>Category: </strong>
                {this.state.oneMission.category}
              </p>
              <p>
                <strong>Alignment: </strong> {this.state.oneMission.alignment}
              </p>
              <p>
                <strong>Recommended rank: </strong>
                {this.state.oneMission.recommended_rank}
              </p>
              <p>
                <strong>Reward: </strong> {this.state.oneMission.reward}
              </p>
              <p>
                <strong>XP: </strong>
                {this.state.oneMission.gained_xp}
              </p>
              <p>
                <strong>Honor: </strong> {this.state.oneMission.honor_points}
              </p>
            </div>
            <p>{this.state.oneMission.details}</p>
            <p>
              <strong>Proof of succes: </strong>
              {this.state.oneMission.proof_of_succes}
            </p>
            {!this.state.oneMission.participants.includes(
              this.props.context.user._id
            ) && (
              <div className="button-box">
                <button onClick={(e) => this.hundleJoin()}>Go!</button>
              </div>
            )}
          </article>
          <div className="one-mission-map">
            <WrappedMap
              googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
              loadingElement={<div style={{ height: "100%" }} />}
              containerElement={<div style={{ height: "100%" }} />}
              mapElement={<div style={{ height: "100%" }} />}
              events={[this.state.oneMission]}
            />
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default withRouter(withUser(OneMission));
