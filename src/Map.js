import React, { useState } from "react";
import ReactMapGL from "react-map-gl";
import { useDispatchMap } from "./hooks/mapHook";
import { MarkerList } from "./Marker/MarkerList";

export const Map = () => {
  const mapDispatch = useDispatchMap();
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
      onClick={x => {
        x.srcEvent.which === 1 &&
          mapDispatch({ type: "ADD_MARKER", payload: { marker: x.lngLat } });
      }}
    >
        <MarkerList />
    </ReactMapGL>
  );
};
