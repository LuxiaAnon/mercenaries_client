import React, { Component } from "react";
import "./FormSignin.css";
import UserContext from "../../Auth/UserContext";
import { withRouter } from "react-router-dom";
import apiHandler from "../../../api/apiHandler";

class FormSignin extends Component {
  static contextType = UserContext;

  state = {
    email: "",
    passwordError: "",
    emailError: "",
  };

  validate = () => {
    let passwordError = "";
    let emailError = "";

    if (!this.state.email) {
      emailError = "Fill this field";
    }

    if (!this.state.password) {
      passwordError = "Fill this field";
    }

    if (passwordError || emailError) {
      this.setState({ passwordError, emailError });
      return false;
    }
    return true;
  };

  handleChange = (event) => {
    const key = event.target.name;

    // You can test more if you have to handle different sorts of inputs.
    const value =
      event.target.type === "file"
        ? event.target.files[0]
        : event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;

    this.setState({ [key]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const isValid = this.validate();

    if (isValid) {
      apiHandler
        .signin(this.state)
        .then((data) => {
          this.context.setUser(data);
          this.props.closing();
          this.props.history.push("/");
        })
        .catch((error) => {
          console.log(error);
          // Display error message here, if you set the state
        });
    }
  };

  render() {
    return (
      <form
        className="login-form"
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
      >
        <h2>Welcome back</h2>
        <label htmlFor="email">Email: </label>
        <input type="email" id="email" name="email" />
        <p
          style={{
            fontSize: "15px",
            color: "var(--fail)",
            fontWeight: "bold",
          }}
        >
          {this.state.emailError}
        </p>
        <br />
        <label htmlFor="password">Password: </label>
        <input type="password" id="password" name="password" />
        <p
          style={{
            fontSize: "15px",
            color: "var(--fail)",
            fontWeight: "bold",
          }}
        >
          {this.state.passwordError}
        </p>
        <br />
        <button>Login</button>
      </form>
    );
  }
}

export default withRouter(FormSignin);
