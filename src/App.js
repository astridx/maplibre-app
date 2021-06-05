import React from "react";
import ReactMapGL from "react-map-gl";

function getTitle(title) {
  return title;
}

function App() {
  const mapViewport = {
    height: "100vh",
    width: "100wh",
    longitude: 7.571606,
    latitude: 50.226913,
    zoom: 4,
  };

  const mapstyle =
    "https://api.maptiler.com/maps/streets/style.json?key=" +
    process.env.REACT_APP_MAPTILER_TOKEN;

  return (
    <div>
      <h1>{getTitle("React Maplibre Map")}</h1>
      <label htmlFor="search">Suche: </label>
      <input id="search" type="text" />
      <ReactMapGL {...mapViewport} mapStyle={mapstyle}></ReactMapGL>
    </div>
  );
}

export default App;
