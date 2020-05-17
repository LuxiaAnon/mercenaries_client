import React from "react";
import { withUser } from "../../components/Auth/withUser";

const Dashboard = (props) => {
  return (
    <div>
      <h1> {props.context.user.alias}</h1>
    </div>
  );
};

export default withUser(Dashboard);
