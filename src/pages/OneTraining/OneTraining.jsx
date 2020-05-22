import React, { Component } from "react";
import "./OneTraining.css";
import apiHandler from "../../api/apiHandler.js";
import { withUser } from "../../components/Auth/withUser";
import WrappedMap from "../../components/WrappedMap";
import { withRouter } from "react-router-dom";

export class OneTraining extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oneTraining: null,
      trainees: null,
    };
    this.joinTraining = this.joinTraining.bind(this);
    this.hundleJoin = this.hundleJoin.bind(this);
  }

  joinTraining(id, data) {
    apiHandler
      .updateATraining(id, data)
      .then((apiRes) => {
        console.log(apiRes.data);
        this.props.history.goBack();
      })
      .catch((err) => console.log(err));
  }

  hundleJoin() {
    const trainingId = this.state.oneTraining._id;
    this.setState({
      trainees: this.state.trainees.push(this.props.context.user._id),
    });
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
        <h2 className="big-title">{this.state.oneTraining.name} </h2>
        <section className="all-one-training-page">
          <article className="infos-training">
            <figure className="image-training">
              <img
                src={this.state.oneTraining.image}
                alt={this.state.oneTraining.name}
              />
            </figure>
            <div className="info-and-button">
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
                  <strong>Details: </strong>
                  {this.state.oneTraining.details}
                </p>
              </div>
            </div>
            {!this.state.oneTraining.trainees.includes(
              this.props.context.user._id
            ) && (
              <div className="button-box">
                <button onClick={(e) => this.hundleJoin()}>Go!</button>
              </div>
            )}
          </article>
          <div className="one-training-map">
            <WrappedMap
              googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
              loadingElement={<div style={{ height: "100%" }} />}
              containerElement={<div style={{ height: "100%" }} />}
              mapElement={<div style={{ height: "100%" }} className="mapmap" />}
              events={[this.state.oneTraining]}
            />
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default withRouter(withUser(OneTraining));
