import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import UserContext from "../Auth/UserContext";
import apiHandler from "../../api/apiHandler";

class FormSignup extends Component {
  static contextType = UserContext;

  state = {
    // email: "",
    // password: "",
    // avatar: "",
    // alias: "",
    // catch_phrase: "",
    // favorite_weapon: "",
    // experience: "",
    // rank: "",
    // honor: "",
    // cash: "",
    tmpAvatar: "media/images/mercenary_default.jpg",
    skills: {
      pistols: 0,
      assault_rifles: 0,
      sniper_rifles: 0,
      hammer: 0,
      first_aid: 0,
      medic_crafting: 0,
      hacking: 0,
      thievery: 0,
      car: false,
      mecha: false,
      spaceship: false,
    },
  };

  skillRating = (name) => {
    let lvlbox = [];
    for (let i = 1; i < 5; i++) {
      lvlbox.push(
        <div
          key={`${name}-${i}`}
          data-lvl={i}
          className={`skill ${this.state.skills[name] >= i ? "fill" : ""}`}
          onClick={(e) => this.handleSkillClick(e, name)}
          id={name}
        ></div>
      );
    }
    return lvlbox;
  };

  handleSkillClick = (e, name) => {
    const value =
      this.state.skills[e.target.getAttribute("id")] ===
      Number(e.target.getAttribute("data-lvl"))
        ? 0
        : Number(e.target.getAttribute("data-lvl"));
    this.setState({
      skills: { ...this.state.skills, [e.target.getAttribute("id")]: value },
    });
  };

  haveDrivingLicence = (name, source) => {
    return (
      <figure>
        <img
          className={`vehicule-picture ${
            this.state.skills[name] === true ? "clicked" : ""
          }`}
          src={source}
          alt={name}
          onClick={(e) => this.handleDrivingClick(e, name)}
        />
      </figure>
    );
  };

  handleDrivingClick = (e, name) => {
    this.setState({
      skills: { ...this.state.skills, [name]: !this.state.skills[name] },
    });
  };

  handleChange = (event) => {
    let value = "";
    const key = event.target.name;
    if (event.target.type === "file") {
      value = event.target.files[0];
      const tmpUrl = URL.createObjectURL(value);
      this.setState({ tmpAvatar: tmpUrl });
    } else if (event.target.type === "checkbox") {
      value = event.target.checked;
    } else if (event.target.type === "radio") {
      value = event.target.value === "yes" ? true : false;
      this.setState({
        skills: { ...this.state.skills, [event.target.name]: value },
      });
      return;
    } else {
      value = event.target.value;
    }

    this.setState({ [key]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    apiHandler
      .signup(this.state)
      .then((data) => {
        this.context.setUser(data);
        this.props.history.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    console.log(this.state);
    return (
      <form
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
        className="signup"
      >
        <section className="avatar-part">
          <figure className="temp-avatar">
            <img src={this.state.tmpAvatar} alt="" />
          </figure>
          <div>
            <input type="file" id="avatar" name="avatar" />
          </div>
        </section>
        <section className="id-part">
          <div>
            <label htmlFor="email">Email: </label>
            <input type="email" name="email" />
          </div>
          <div>
            <label htmlFor="password">Password: </label>
            <input type="password" name="password" />
          </div>
        </section>
        <section className="personality-part">
          <h2>Who are you?</h2>
          <div>
            <label htmlFor="alias">Alias: </label>
            <input type="text" name="alias" />
          </div>
          <div>
            <label htmlFor="favorite_weapon">Favorite weapon: </label>
            <input type="text" name="favorite_weapon" />
          </div>
          <div>
            <label htmlFor="catch_phrase">Catch phrase: </label>
            <input type="text" name="catch_phrase" />
          </div>
        </section>
        <section className="skills-part">
          <h2>How good are you?</h2>
          <div>
            <h3>Weapons:</h3>
            <div className="weapons">
              <label htmlFor="pistols">Pistols </label>
              {this.skillRating("pistols")}
            </div>
            <div>
              <label htmlFor="assault_rifles">Assault rifles </label>
              {this.skillRating("assault_rifles")}
            </div>
            <div>
              <label htmlFor="sniper_rifles">Sniper rifles </label>
              {this.skillRating("sniper_rifles")}
            </div>
            <div>
              <label htmlFor="hammer">Hammer </label>
              {this.skillRating("hammer")}
            </div>
          </div>
          <div className="healthcare">
            <h3>Healthcare:</h3>
            <div>
              <label htmlFor="first_aid">First aid </label>
              {this.skillRating("first_aid")}
            </div>
            <div>
              <label htmlFor="medic_crafting">Medic crafting </label>
              {this.skillRating("medic_crafting")}
            </div>
          </div>
          <div>
            <h3>Stealth:</h3>
            <div>
              <label htmlFor="hacking">Hacking </label>
              {this.skillRating("hacking")}
            </div>
            <div>
              <label htmlFor="thievery">Thievery </label>
              {this.skillRating("thievery")}
            </div>
          </div>
          <div className="driving">
            <h2>What can you drive?</h2>
            <div>
              <p>Car</p>
              {this.haveDrivingLicence("car", "media/images/car.jpg")}
            </div>
            <div>
              <p>Mecha</p>
              {this.haveDrivingLicence("mecha", "media/images/mecha.jpg")}
            </div>
            <div>
              <p>Spaceship</p>
              {this.haveDrivingLicence("spaceship", "media/images/spaceship.jpg")}
            </div>
          </div>
        </section>
        <button>Go!</button>
      </form>
    );
  }
}

export default withRouter(FormSignup);
