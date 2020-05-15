import React from "react";
import HomeNotConnected from "./HomeNotConnected";
import HomeConnected from "./HomeConnected";
import { withUser } from "../../components/Auth/withUser";
import "./Home.css";

const Home = (props) => {
  const { context } = props;
  return (
    <div>
      {!context.isLoggedIn && <HomeNotConnected />}
      {context.isLoggedIn && <HomeConnected />}
    </div>
  );
};

export default withUser(Home);
