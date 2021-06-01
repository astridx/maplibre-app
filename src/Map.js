import React, { useState } from "react";
import ReactMapGL from "react-map-gl";

export const Map = () => {
  const [mapViewport, setMapViewport] = useState({
    height: "100vh",
    width: "100wh",
    longitude: 7.571606,
    latitude: 50.226913,
    zoom: 4
  });

  return (
    <ReactMapGL
      {...mapViewport}
      mapStyle="https://api.maptiler.com/maps/streets/style.json?key=my_key"
      onViewportChange={setMapViewport}
    ></ReactMapGL>
  );
};
