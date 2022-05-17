import React from "react";
import { useState, useEffect } from "react";

const getCurrentPosition = () => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState(null);

  const getLocation = () => {
    const options = {
      timeout: 10000,
      enableHighAccuracy: true,
      maximumAge: 0
    };

    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.setState({
          lat: position.coords.latitude,
          long: position.coords.longitude
        });
      },(error) => {
        console.log(error)
      },options);
    }
  }

  return (
    <div>
      {/* <button onClick={getLocation}>Get Location</button> */}
      {/* <h1>Coordinates</h1> */}
      {/* <p>{status}</p> */}
      {/* {lat && <p>Latitude: {lat}</p>} */}
      {/* {lng && <p>Longitude: {lng}</p>} */}
    </div>
  );
};

export default getCurrentPosition;
