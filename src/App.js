import React from "react";
import ReactMapGL from "react-map-gl";

const title = "React Maplibre Map";

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
      <h1>{title}</h1>
      <ReactMapGL {...mapViewport} mapStyle={mapstyle}></ReactMapGL>
    </div>
  );
}

export default App;
