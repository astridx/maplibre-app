import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, NavigationControl } from "react-map-gl";

function getTitle(title) {
  return title;
}

const useSemiPersistentState = (key, initialState) => {
  const [value, setValue] = useState(localStorage.getItem(key) || initialState);

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
};

function App() {
  const [searchTerm, setSearchTerm] = useSemiPersistentState("search", "Brot");

  const [centerTerm, setCenterTerm] = useSemiPersistentState(
    "center",
    "50.2, 7.5"
  );

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCenter = (event) => {
    setCenterTerm(event.target.value);
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
      <LabelInput
        id="suche"
        onInputChange={handleSearch}
        value={searchTerm}
        isAutoFocused
      >
        <big> Suche: </big>
      </LabelInput>
      <LabelInput id="center" onInputChange={handleCenter} value={centerTerm}>
        <small>Kartenmittelpunkt: </small>
      </LabelInput>
      <Map list={searchedpois} center={centerTerm} />
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

  const c = props.center.split(",");

  const [mapViewportBig, setMapViewportBig] = useState({
    height: "50vh",
    width: "50vw",
    longitude: parseFloat(c[1]),
    latitude: parseFloat(c[0]),
    zoom: 4,
  });

  const [mapViewportSmall, setMapViewportSmall] = useState({
    height: "25vh",
    width: "25vw",
    longitude: parseFloat(c[1]),
    latitude: parseFloat(c[0]),
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

const LabelInput = ({
  id,
  value,
  onInputChange,
  type = "text",
  isAutoFocused,
  children,
}) => {
  // 1
  const inputRef = React.useRef();
  // 3
  React.useEffect(() => {
    if (isAutoFocused && inputRef.current) {
      // 4
      inputRef.current.focus();
    }
  }, [isAutoFocused]);

  return (
    <>
      <label htmlFor={id}>{children}</label>
      {/* 2 */}
      <input
        ref={inputRef}
        id={id}
        type={type}
        value={value}
        onChange={onInputChange}
      />
      <br />
    </>
  );
};

export default App;
