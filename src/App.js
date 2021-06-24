import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, NavigationControl } from "react-map-gl";

function getTitle(title) {
  return title;
}

const useSemiPersistentState = () => {
  const [value, setValue] = useState(localStorage.getItem("value") || "Brot");

  useEffect(() => {
    localStorage.setItem("value", value);
  }, [value]);

  return [value, setValue];
};

function App() {
  const [searchTerm, setSearchTerm] = useSemiPersistentState();

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const pois = [
    {
      display_name: "Brot und mehr",
      icon: "https://nominatim.openstreetmap.org/ui/mapicons//shopping_bakery.p.20.png",
      lat: "50.4",
      lon: "6.1",
      place_id: "1",
    },
    {
      display_name: "Baecker Mueller",
      icon: "https://nominatim.openstreetmap.org/ui/mapicons//shopping_bakery.p.20.png",
      lat: "51.4",
      lon: "6.1",
      place_id: "2",
    },
    {
      display_name: "Brot am Morgen",
      icon: "https://nominatim.openstreetmap.org/ui/mapicons//shopping_bakery.p.20.png",
      lat: "50.4",
      lon: "7.1",
      place_id: "3",
    },
    {
      display_name: "Baecker Pleinen",
      icon: "https://nominatim.openstreetmap.org/ui/mapicons//shopping_bakery.p.20.png",
      lat: "51.4",
      lon: "7.1",
      place_id: "4",
    },
  ];

  const searchedpois = pois.filter((poi) =>
    poi.display_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>{getTitle("React Maplibre Map")}</h1>
      <Search onSearch={handleSearch} searchTerm={searchTerm} />
      <Map list={searchedpois} />
      <List list={searchedpois} />
    </div>
  );
}

const List = (props) => (
  <table>
    <tbody>
      {props.list.map((item) => (
        <POI key={item.place_id} poi={item} />
      ))}
    </tbody>
  </table>
);

const POI = ({ poi }) => (
  <tr key={poi.place_id}>
    <td>{poi.display_name}</td>
    <td>{poi.lat}</td>
    <td>{poi.lon}</td>
    <td>
      <img alt="" src={poi.icon} />
    </td>
  </tr>
);

const Map = (props) => {
  const mapstyle =
    "https://api.maptiler.com/maps/streets/style.json?key=" +
    process.env.REACT_APP_MAPTILER_TOKEN;

  const [mapViewportBig, setMapViewportBig] = useState({
    height: "50vh",
    width: "50vw",
    longitude: 7.571606,
    latitude: 50.226913,
    zoom: 4,
  });

  const [mapViewportSmall, setMapViewportSmall] = useState({
    height: "25vh",
    width: "25vw",
    longitude: 7.571606,
    latitude: 50.226913,
    zoom: 10,
  });

  return (
    <>
      <ReactMapGL
        key={1}
        {...mapViewportSmall}
        mapStyle={mapstyle}
        onViewportChange={setMapViewportSmall}
      >
        <NavigationControl />
      </ReactMapGL>
      <ReactMapGL
        key={2}
        {...mapViewportBig}
        mapStyle={mapstyle}
        onViewportChange={setMapViewportBig}
      >
        <NavigationControl />
        {props.list.map((marker) => (
          <Marker
            key={marker.place_id}
            offsetTop={0}
            offsetLeft={0}
            latitude={parseFloat(marker.lat)}
            longitude={parseFloat(marker.lon)}
          >
            <img src={marker.icon} />
          </Marker>
        ))}
      </ReactMapGL>
    </>
  );
};

const Search = ({ searchTerm, onSearch }) => (
  <div>
    <label htmlFor="search">Suche: </label>
    <input id="search" type="text" value={searchTerm} onChange={onSearch} />
    <p>
      Suchwort: <strong>{searchTerm}</strong>
    </p>
  </div>
);

export default App;
