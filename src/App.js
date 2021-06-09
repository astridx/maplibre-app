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

function App() {
  return (
    <div>
      <h1>{getTitle("React Maplibre Map")}</h1>
      <Search />
      <List />
      <Map />
      <List />
    </div>
  );
}

function List() {
  return (
    <table>
      <tbody>
        {pois.map(function (item) {
          return (
            <tr key={item.place_id}>
              <td>{item.display_name}</td>
              <td>{item.lat}</td>
              <td>{item.lon}</td>
              <td>
                <img alt="" src={item.icon} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export const Map = () => {
  const mapstyle =
    "https://api.maptiler.com/maps/streets/style.json?key=" +
    process.env.REACT_APP_MAPTILER_TOKEN;

  return (
    <>
      <ReactMapGL {...mapViewportSmall} mapStyle={mapstyle}></ReactMapGL>
      <ReactMapGL {...mapViewportBig} mapStyle={mapstyle}></ReactMapGL>
    </>
  );
};

function Search() {
  return (
    <div>
      <label htmlFor="search">Suche: </label>
      <input id="search" type="text" />
    </div>
  );
}

export default App;
