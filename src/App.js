import React from "react";
import ReactMapGL from "react-map-gl";

function getTitle(title) {
  return title;
}

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

const mapViewportBig = {
  height: "50vh",
  width: "50vw",
  longitude: 7.571606,
  latitude: 50.226913,
  zoom: 4,
};

const mapViewportSmall = {
  height: "15vh",
  width: "15vw",
  longitude: 7.571606,
  latitude: 50.226913,
  zoom: 4,
};

const App = () => (
  <div>
    <h1>{getTitle("React Maplibre Map")}</h1>
    <Search />
    <Map />
    <List />
  </div>
);

const List = () => (
  <table>
    <tbody>
      {pois.map((item) => (
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

  return (
    <>
      <ReactMapGL
        key={1}
        {...mapViewportSmall}
        mapStyle={mapstyle}
      ></ReactMapGL>
      <ReactMapGL key={2} {...mapViewportBig} mapStyle={mapstyle}></ReactMapGL>
    </>
  );
}

function Search() {
  const handleChange = (event) => {
    console.log(event);
    console.log(event.target.value);
  };

  return (
    <div>
      <label htmlFor="search">Suche: </label>
      <input id="search" type="text" onChange={handleChange} />
    </div>
  );
}

export default App;
