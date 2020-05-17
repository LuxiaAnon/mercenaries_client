import React, { Component } from "react";
import "./OneTraining.css";
import apiHandler from "../../api/apiHandler.js";
import { withUser } from "../../components/Auth/withUser";
import WrappedMap from "../../components/WrappedMap";

export class OneTraining extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oneTraining: null,
      trainees: null,
      currentUser: this.props.context.user,
    };
    this.joinTraining = this.joinTraining.bind(this);
    this.hundleJoin = this.hundleJoin.bind(this);
  }

  joinTraining(id, data) {
    apiHandler
      .updateATraining(id, data)
      .then((apiRes) => {
        console.log(apiRes.data);
      })
      .catch((err) => console.log(err));
  }

  hundleJoin() {
    const trainingId = this.state.oneTraining._id;
    const mercenaryId = this.state.currentUser._id;

    this.setState({ trainees: this.state.trainees.push(mercenaryId) });
    console.log(this.state);
    this.joinTraining(trainingId, this.state.oneTraining);
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    apiHandler
      .getOneTraining(id)
      .then((apiRes) => {
        this.setState({
          oneTraining: apiRes,
          trainees: apiRes.trainees,
          // trainees: [...apiRes.trainees],
        });
      })
      .catch((err) => {});
  }

  render() {
    if (!this.state.oneTraining) return null;
    return (
      <React.Fragment>
        <section>
          <figure className="image-training">
            <img
              src={this.state.oneTraining.image}
              alt={this.state.oneTraining.name}
            />
          </figure>
          <article className="infos-training">
            <h2>{this.state.oneTraining.name} </h2>
            <div>
              <p>
                <strong>Category: </strong>
                {this.state.oneTraining.category}
              </p>
              <p>
                <strong>Skill learned: </strong>
                {this.state.oneTraining.skill_learned}
              </p>
              <p>
                <strong>Recommended rank: </strong>
                {this.state.oneTraining.recommended_rank}
              </p>
            </div>
            <p>{this.state.oneTraining.details}</p>

            <div className="button-box">
              <button onClick={(e) => this.hundleJoin()}>Go!</button>
            </div>
          </article>
          <div className="one-training-map">
            <WrappedMap
              googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
              loadingElement={<div style={{ height: "100%" }} />}
              containerElement={<div style={{ height: "100%" }} />}
              mapElement={<div style={{ height: "100%" }} />}
              events={[this.state.oneTraining]}
            />
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default withUser(OneTraining);
