import React from "react";
import "./HomeNotConnected.css";

const HomeNotConnected = (props) => {
  return (
    <React.Fragment>
      <div id="home-page">
        <h1>MERCENARIES</h1>
        <main>
          <div className="home-catchy-phrase-container">
            <h2>
              A long enough catchy phrase to recruit a lot of Mercenaries in two
              rows it is better
            </h2>
          </div>
          <section className="home-benefits">
            <article>
              <h3>Missions for all</h3>
              <figure>
                <img
                  className="home-page-img"
                  src="media/images/alignment.jpg"
                  alt="alignment choice"
                />
              </figure>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi{" "}
              </p>
            </article>
            <article>
              <h3>Payment facilities</h3>
              <figure>
                <img
                  className="home-page-img"
                  src="media/images/credits.png"
                  alt="payment facilities"
                />
              </figure>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi{" "}
              </p>
            </article>
            <article>
              <h3>Biggest agency</h3>
              <figure>
                <img
                  className="home-page-img"
                  src="media/images/mercenaries.jpg"
                  alt="biggest agency"
                />
              </figure>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi{" "}
              </p>
            </article>
            <article>
              <h3>All kinds of trainings</h3>
              <figure>
                <img
                  className="home-page-img"
                  src="media/images/trainings.jpg"
                  alt="trainings"
                />
              </figure>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi{" "}
              </p>
            </article>
          </section>
        </main>
      </div>
    </React.Fragment>
  );
};

export default HomeNotConnected;