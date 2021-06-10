import React from "react";
import ReactMapGL from "react-map-gl";

function getTitle(title) {
  return title;
}

function App() {
  const pois = [
    {
      display_name: "Brot und mehr",
      icon: "https://nominatim.openstreetmap.org/ui/mapicons//shopping_bakery.p.20.png",
      lat: "50.4",
      lon: "7.1",
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
      lon: "6.1",
      place_id: "4",
    },
  ];

  return (
    <div>
      <h1>{getTitle("React Maplibre Map")}</h1>
      <Search />
      <Map />
      <List list={pois} />
    </div>
  );
}

const List = (props) => (
  <table>
    <tbody>
      {props.list.map((item) => (
        <tr key={item.place_id}>
          <td>{item.display_name}</td>
          <td>{item.lat}</td>
          <td>{item.lon}</td>
          <td>
            <img alt="" src={item.icon} />
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

const Map = () => {
  const mapstyle =
    "https://api.maptiler.com/maps/streets/style.json?key=" +
    process.env.REACT_APP_MAPTILER_TOKEN;

  const [mapViewportBig, setMapViewportBig] = React.useState({
    height: "50vh",
    width: "50vw",
    longitude: 7.571606,
    latitude: 50.226913,
    zoom: 4,
  });

  const [mapViewportSmall, setMapViewportSmall] = React.useState({
    height: "15vh",
    width: "15vw",
    longitude: 7.571606,
    latitude: 50.226913,
    zoom: 10,
  });

  return (
    <>
      <ReactMapGL
        {...mapViewportSmall}
        mapStyle={mapstyle}
        onViewportChange={setMapViewportSmall}
      ></ReactMapGL>
      <ReactMapGL
        {...mapViewportBig}
        mapStyle={mapstyle}
        onViewportChange={setMapViewportBig}
      ></ReactMapGL>
    </>
  );
};

function Search() {
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const [searchTerm, setSearchTerm] = React.useState("");

  return (
    <div>
      <label htmlFor="search">Suche: </label>
      <input id="search" type="text" onChange={handleChange} />
      <p>
        Suchwort: <strong>{searchTerm}</strong>
      </p>
    </div>
  );
}

export default App;
