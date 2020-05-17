import { withUser } from "../../components/Auth/withUser";
import React, { Component } from "react";

export class Dashboard extends Component {
  render() {
    return (
      <div>
        <h1> {this.props.context.user.alias}</h1>
      </div>
    );
  }
}

export default withUser(Dashboard);
