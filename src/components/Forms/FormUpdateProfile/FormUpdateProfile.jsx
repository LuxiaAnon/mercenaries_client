import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withUser } from "../../Auth/withUser";
import apiHandler from "../../../api/apiHandler";
import "../FormSignup/FormSignup.css";

export class FormUpdateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alias: null,
      email: null,
      catch_phrase: null,
      favorite_weapon: null,
      password: null,
      tmpAvatar: null,
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
      isLoading: true,
    };
  }

  componentDidMount() {
    let user = this.props.context.user;
    console.log(user);
    this.setState({
      tmpAvatar: user.avatar,
      alias: user.alias,
      email: user.email,
      catch_phrase: user.catch_phrase,
      favorite_weapon: user.favorite_weapon,
      password: user.password,
      skills: {
        ...this.state.skills,
        pistols: user.skills.pistols,
        assault_rifles: user.skills.assault_rifles,
        sniper_rifles: user.skills.sniper_rifles,
        hammer: user.skills.hammer,
        first_aid: user.skills.first_aid,
        medic_crafting: user.skills.medic_crafting,
        hacking: user.skills.hacking,
        thievery: user.skills.thievery,
        car: user.skills.car,
        mecha: user.skills.mecha,
        spaceship: user.skills.spaceship,
      },
      isLoading: false,
    });
  }

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
      skills: {
        ...this.state.skills,
        [e.target.getAttribute("id")]: value,
      },
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
    const fd = new FormData();
    if (this.state.avatar) fd.append("avatar", this.state.avatar);
    fd.append("email", this.state.email);
    fd.append("alias", this.state.alias);
    fd.append("password", this.state.password);
    fd.append("favorite_weapon", this.state.favorite_weapon);
    fd.append("catch_phrase", this.state.catch_phrase);
    fd.append("skills", JSON.stringify(this.state.skills));

    apiHandler
      .updateAUser(this.props.context.user._id, fd)
      .then((apiRes) => {
        console.log(apiRes);
        this.props.history.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    if (this.state.isLoading) return null;
    // console.log(this.setState);
    return (
      <React.Fragment>
        <div className="signup-title">
          <h1>MERCENARIES</h1>
        </div>
        <form
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
          className="signup"
        >
          <section className="avatar part">
            <figure className="temp-avatar">
              <img src={this.state.tmpAvatar} alt="" />
            </figure>
            <div>
              <input type="file" id="avatar" name="avatar" />
            </div>
          </section>
          <section className="id part">
            <div>
              <label htmlFor="email">Email: </label>
              <input
                type="email"
                name="email"
                defaultValue={this.props.context.user.email}
              />
            </div>
            <div>
              <label htmlFor="password">Password: </label>
              <input
                type="password"
                name="password"
                defaultValue={this.props.context.user.password}
              />
            </div>
          </section>
          <section className="personality part">
            <h2>Who are you?</h2>
            <div>
              <label htmlFor="alias">Alias: </label>
              <input
                type="text"
                name="alias"
                defaultValue={this.props.context.user.alias}
              />
            </div>
            <div>
              <label htmlFor="favorite_weapon">Favorite weapon: </label>
              <input
                type="text"
                name="favorite_weapon"
                defaultValue={this.props.context.user.favorite_weapon}
              />
            </div>
            <div>
              <label htmlFor="catch_phrase">Catch phrase: </label>
              <input
                type="text"
                name="catch_phrase"
                defaultValue={this.props.context.user.catch_phrase}
              />
            </div>
          </section>
          <section className="skills part">
            <h2>How good are you?</h2>

            <h3>Weapons:</h3>

            <div className="weapons weapons-big-screen">
              <div className="oneSkill">
                <label htmlFor="pistols">Pistols </label>
                {this.skillRating("pistols")}
              </div>
              <div className="oneSkill">
                <label htmlFor="assault_rifles">Assault rifles </label>
                {this.skillRating("assault_rifles")}
              </div>
              <div className="oneSkill">
                <label htmlFor="sniper_rifles">Sniper rifles </label>
                {this.skillRating("sniper_rifles")}
              </div>
              <div className="oneSkill">
                <label htmlFor="hammer">Hammer </label>
                {this.skillRating("hammer")}
              </div>
            </div>
            <div className=" others-big-screen">
              <div className="healthcare">
                <h3>Healthcare:</h3>
                <div className="oneSkill">
                  <label htmlFor="first_aid">First aid </label>
                  {this.skillRating("first_aid")}
                </div>
                <div className="oneSkill">
                  <label htmlFor="medic_crafting">Medic crafting </label>
                  {this.skillRating("medic_crafting")}
                </div>
              </div>
              <div>
                <h3>Stealth:</h3>
                <div className="oneSkill">
                  <label htmlFor="hacking">Hacking </label>
                  {this.skillRating("hacking")}
                </div>
                <div className="oneSkill">
                  <label htmlFor="thievery">Thievery </label>
                  {this.skillRating("thievery")}
                </div>
              </div>
            </div>
          </section>
          <section>
            <div className="driving part">
              <h2>What can you drive?</h2>
              <div className="licences">
                <div>
                  {this.haveDrivingLicence("car", "media/images/car.jpg")}
                  <p>Car</p>
                </div>
                <div>
                  {this.haveDrivingLicence("mecha", "media/images/mecha.jpg")}
                  <p>Mecha</p>
                </div>
                <div>
                  {this.haveDrivingLicence(
                    "spaceship",
                    "media/images/spaceship.jpg"
                  )}
                  <p>Spaceship</p>
                </div>
              </div>
            </div>
          </section>
          <button>Update</button>
        </form>
      </React.Fragment>
    );
  }
}

export default withUser(FormUpdateProfile);
