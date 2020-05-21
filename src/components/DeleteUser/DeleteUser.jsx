import React, { Component } from "react";

export class DeleteUser extends Component {
  render() {
    console.log("j'existe");
    return (
      <div style={{ marginBottom: "2em", fontSize: "1.5em" }}>
        <p>Are you sure you wanna quit?</p>
      </div>
    );
  }
}

export default DeleteUser;
