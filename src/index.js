import React from "react";
import ReactDOM from "react-dom";
import ReactMapGL from "react-map-gl";

const mapViewport = {
  height: "100vh",
  width: "100vw",
  longitude: 7.571606,
  latitude: 50.226913,
  zoom: 4,
};

const mapstyle =
  "https://api.maptiler.com/maps/streets/style.json?key=" +
  process.env.REACT_APP_MAPTILER_TOKEN;

ReactDOM.render(
  <ReactMapGL {...mapViewport} mapStyle={mapstyle}></ReactMapGL>,
  document.getElementById("root")
);
