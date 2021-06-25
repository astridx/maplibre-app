import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, NavigationControl } from "react-map-gl";
import axios from "axios";

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

const poisReducer = (state, action) => {
  switch (action.type) {
    case "POIS_FETCH_INIT":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "POIS_FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case "POIS_FETCH_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case "REMOVE_POIS":
      return {
        ...state,
        data: state.data.filter(
          (poi) => action.payload.place_id !== poi.place_id
        ),
      };

    default:
      throw new Error();
  }
};

function App() {
  const [searchTerm, setSearchTerm] = useSemiPersistentState("search", "");

  const [centerTerm, setCenterTerm] = useSemiPersistentState(
    "center",
    "50.2, 7.5"
  );

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCenter = (event) => {
    if (
      parseFloat(event.target.value.split(",")[0]) + 0.1 > 90 ||
      parseFloat(event.target.value.split(",")[0]) - 0.1 < -90 ||
      parseFloat(event.target.value.split(",")[1]) + 0.1 > 180 ||
      parseFloat(event.target.value.split(",")[1]) - 0.1 < -180
    ) {
      setCenterTerm("50.2, 7.5");
    } else {
      setCenterTerm(event.target.value);
    }
  };

  const handleSubmit = () => {
    let lat = parseFloat(centerTerm.split(",")[0]);
    if (!lat || lat > 89.9 || lat < -89.9) {
      lat = 50.2;
    }

    let lon = parseFloat(centerTerm.split(",")[1]);
    if (!lon || lon > 179.9 || lon < -179.9) {
      lon = 7.5;
    }

    setCenterTerm(`${lat},${lon}`);
    setUrl(
      API_ENDPOINT +
        `&q=${searchTerm},bakery` +
        `&viewbox=${lon + 0.1},${lat + 0.1},${lon - 0.1},${lat - 0.1}`
    );
  };

  const API_ENDPOINT =
    "https://nominatim.openstreetmap.org/search?bounded=1&format=json&polygon=0&addressdetails=1";

  const [url, setUrl] = React.useState(
    API_ENDPOINT +
      `&q=${searchTerm},bakery` +
      `&viewbox=${parseFloat(centerTerm.split(",")[1]) + 0.1},${
        parseFloat(centerTerm.split(",")[0]) + 0.1
      },${parseFloat(centerTerm.split(",")[1]) - 0.1},${
        parseFloat(centerTerm.split(",")[0]) - 0.1
      }`
  );

  const [pois, dispatchPois] = React.useReducer(poisReducer, {
    data: [],
    isLoading: false,
    isError: false,
  });

  const handleFetchPois = React.useCallback(async () => {
    if (parseFloat(centerTerm.split(",")[0]) + 0.1 > 90) return;
    if (parseFloat(centerTerm.split(",")[0]) - 0.1 < -90) return;
    if (parseFloat(centerTerm.split(",")[1]) + 0.1 > 180) return;
    if (parseFloat(centerTerm.split(",")[1]) - 0.1 < -180) return;

    dispatchPois({ type: "POIS_FETCH_INIT" });

    try {
      const result = await axios.get(url);
      dispatchPois({
        type: "POIS_FETCH_SUCCESS",
        payload: result.data,
      });
    } catch {
      dispatchPois({ type: "POIS_FETCH_FAILURE" });
    }
  }, [url]);

  useEffect(() => {
    handleFetchPois();
  }, [handleFetchPois]);

  const handleRemovePoi = (item) => {
    dispatchPois({
      type: "REMOVE_POIS",
      payload: item,
    });
  };

  return (
    <div>
      <h1>{getTitle("React Maplibre Map")}</h1>
      <LabelInput id="suche" onInputChange={handleSearch} value={searchTerm}>
        <big> Suche: </big>
      </LabelInput>
      <LabelInput
        id="center"
        onInputChange={handleCenter}
        value={centerTerm}
        isAutoFocused
      >
        <small>Kartenmittelpunkt: </small>
      </LabelInput>
      <button type="button" disabled={!centerTerm} onClick={handleSubmit}>
        Neue Suche
      </button>
      <Map
        list={pois.data}
        center={centerTerm}
        onRemoveItem={handleRemovePoi}
      />

      {pois.isError && <p>Etwas ist schief gelaufen ...</p>}

      {pois.isLoading ? (
        <p>Ich lade die Daten ...</p>
      ) : (
        <List list={pois.data} onRemoveItem={handleRemovePoi} />
      )}
    </div>
  );
}

const List = (props) => (
  <table>
    <tbody>
      {props.list.map((item) => (
        <POI key={item.place_id} poi={item} onRemovePoi={props.onRemoveItem} />
      ))}
    </tbody>
  </table>
);

const POI = ({ poi, onRemovePoi }) => {
  return (
    <tr key={poi.place_id}>
      <td>{poi.display_name}</td>
      <td>{poi.lat}</td>
      <td>{poi.lon}</td>
      <td>
        <img alt="" src={poi.icon} />
      </td>
      <td>
        <button
          type="button"
          onClick={() => {
            onRemovePoi(poi);
          }}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

const Mapmarker = ({ marker, onRemoveMarker }) => {
  return (
    <Marker
      key={marker.place_id}
      offsetTop={0}
      offsetLeft={0}
      latitude={parseFloat(marker.lat)}
      longitude={parseFloat(marker.lon)}
    >
      <img
        onContextMenu={(x) => {
          x.preventDefault();
          onRemoveMarker(marker);
        }}
        src={marker.icon}
      />
    </Marker>
  );
};

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
        onClick={(x) => {
          console.log(
            "lat: " +
              x.lngLat[1] +
              ", lon: " +
              x.lngLat[0] +
              ", Timestamp: " +
              x.timeStamp
          );
        }}
      >
        <NavigationControl />

        {props.list.map((item) => (
          <Mapmarker
            key={item.place_id}
            marker={item}
            onRemoveMarker={props.onRemoveItem}
          />
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
  const inputRef = React.useRef();
  React.useEffect(() => {
    if (isAutoFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isAutoFocused]);

  return (
    <>
      <label htmlFor={id}>{children}</label>
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
