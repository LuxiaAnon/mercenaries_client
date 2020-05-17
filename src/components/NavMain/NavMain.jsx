import React from "react";
import { NavLink } from "react-router-dom";
import { withUser } from "../Auth/withUser";
import apiHandler from "../../api/apiHandler";
import FormSignin from "../Forms/FormSignin/FormSignin";
import "./NavMain.css";
import Modal from "react-modal";

const NavMain = (props) => {
  const { context } = props;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function handleLogout() {
    apiHandler
      .logout()
      .then(() => {
        context.removeUser();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const customStyles = {
    content: {
      backgroundColor: "var(--darkBlue)",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
    },
  };
  console.log(context.user);
  return (
    <nav className="NavMain">
      <ul className="nav-list">
        {context.isLoggedIn && (
          <div className="connected">
            <li>
              <li>
                <p onClick={handleLogout}>Logout</p>
              </li>
            </li>
            <li>
              <NavLink exact to="/">
                <h3 className="logo">MERCENARIES</h3>
              </NavLink>
            </li>
            <li>
              <div className="mercernary-card">
                <div className="mercenary-card-info">
                  <p className="mercenary-name">{context.user.alias}</p>
                  <p>Rank: {context.user.rank}</p>
                  <p>Bank: {context.user.cash}</p>
                </div>
                <NavLink to="/dashboard">
                  <figure>
                    <img src={context.user.avatar} alt={context.user.alias} />
                  </figure>
                </NavLink>
              </div>
            </li>
          </div>
        )}
        {!context.isLoggedIn && (
          <div className="not-connected">
            <li onClick={openModal}>Log in</li>
            <Modal isOpen={modalIsOpen} style={customStyles}>
              <FormSignin closing={closeModal} />
              <button
                style={{
                  border: "none",
                  backgroundColor: "var(--almostWhite)",
                  color: "var(--darkBlue)",
                  fontFamily: "Cairo,sans-serif",
                  width: "20%",
                  borderRadius: "5px",
                }}
                onClick={closeModal}
              >
                Close
              </button>
            </Modal>
            <li>
              <NavLink to="/signup">Create account</NavLink>
            </li>
          </div>
        )}
      </ul>
    </nav>
  );
};

export default withUser(NavMain);
