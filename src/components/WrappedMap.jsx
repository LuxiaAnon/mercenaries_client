import React, { useState } from "react";
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";

const WrappedMap = (props) => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  return (
    <GoogleMap
      defaultZoom={12}
      defaultCenter={{ lat: 48.856613, lng: 2.352222 }}
    >
      {props.events.map((event, index) => (
        <Marker
          key={index}
          position={{ lat: event.coordinates[0], lng: event.coordinates[1] }}
          onClick={() => {
            setSelectedEvent(event);
          }}
          icon={{
            url: `./media/${event.category}.svg`,
            scaledSize: new window.google.maps.Size(25, 25),
          }}
        />
      ))}

      {selectedEvent && (
        <InfoWindow
          position={{
            lat: selectedEvent.coordinates[0],
            lng: selectedEvent.coordinates[1],
          }}
          onCloseClick={() => {
            setSelectedEvent(null);
          }}
        >
          <div style={{ width: "8vw" }}>
            <img style={{ width: "90%" }} src={selectedEvent.image} alt="" />
            <h2 style={{ color: "black", fontWeight: "bold" }}>
              {selectedEvent.name}
            </h2>
            <br />
            <p style={{ color: "black" }}>{selectedEvent.details}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

// const WrappedMap = withScriptjs(withGoogleMap(Map));

export default withScriptjs(withGoogleMap(WrappedMap));
