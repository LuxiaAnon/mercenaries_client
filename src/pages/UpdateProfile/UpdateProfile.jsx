import React, { Component } from "react";
import "./UpdateProfile.css";
import { withUser } from "../../components/Auth/withUser";
import FormUpdateProfile from "../../components/Forms/FormUpdateProfile/FormUpdateProfile";

export class UpdateProfile extends Component {
  render() {
    return (
      <React.Fragment>
        <FormUpdateProfile />
      </React.Fragment>
    );
  }
}

export default withUser(UpdateProfile);
