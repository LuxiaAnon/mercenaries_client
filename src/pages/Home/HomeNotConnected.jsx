import React from "react";
import "./HomeNotConnected.css";

const HomeNotConnected = (props) => {
  return (
    <React.Fragment>
      <div id="home-page-not-connected">
        <h1>MERCENARIES</h1>
        <main>
          <div className="home-catchy-phrase-container">
            {/* <h2>IF YOU CAN CARRY A GUN SOMEONE NEEDS YOU</h2> */}
            <h2>If you can use a gun, someone needs you.</h2>
          </div>
          <section className="home-benefits">
            <article>
              <h2>Missions for all</h2>
              <figure>
                <img
                  className="home-page-img"
                  src="media/images/alignment.jpg"
                  alt="alignment choice"
                />
              </figure>
              <p>
                We offer missions for all alignments. Good, neutral or even
                evils mercenaries will find some missions which fit them. But as
                you can guess, we do not organize afterworks.
              </p>
            </article>
            <article>
              <h2>Payment facilities</h2>
              <figure>
                <img
                  className="home-page-img"
                  src="media/images/credits.png"
                  alt="payment facilities"
                />
              </figure>
              <p>
                We garantee instant and secure payments. As soon you send us the
                proof of achievement of your mission, your Mercenaries bank
                account will be credited.
              </p>
            </article>
            <article>
              <h2>Biggest agency</h2>
              <figure>
                <img
                  className="home-page-img"
                  src="media/images/mercenaries.jpg"
                  alt="biggest agency"
                />
              </figure>
              <p>
                We are present since the Revolution of 2032. If you can fight
                don't be affraid of poverty, because we will always have mission
                for you. That's the freedom.
              </p>
            </article>
            <article>
              <h2>All kinds of trainings</h2>
              <figure>
                <img
                  className="home-page-img"
                  src="media/images/trainings.jpg"
                  alt="trainings"
                />
              </figure>
              <p>
                We have a lot of training to improve your differents skills.
                Weapons, healthcare and even driving lessons. We are sure you've
                always wanted drive a mecha.
              </p>
            </article>
          </section>
        </main>
      </div>
    </React.Fragment>
  );
};

export default HomeNotConnected;
