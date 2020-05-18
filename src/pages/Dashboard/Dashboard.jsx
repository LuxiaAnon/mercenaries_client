import { withUser } from "../../components/Auth/withUser";
import React, { Component } from "react";
import apiHandler from "../../api/apiHandler";

export class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: this.props.context.user,
      // allMissions
      activeMissions: [],
      activeTrainings: [],
      finishedMissions: [],
      finishedTrainings: [],
    };
  }

  // componentDidMount() {
  //   apiHandler
  //     .getAllMissions()
  //     .then((apiRes) => {
  //       this.setState({activeMissions:this.state.activeMissions.push(apiRes.includes())})
  //     })
  //     .catch((err) => console.log(err));
  // }

  render() {
    return (
      <div>
        <h1> {this.props.context.user.alias}</h1>
      </div>
    );
  }
}

export default withUser(Dashboard);
