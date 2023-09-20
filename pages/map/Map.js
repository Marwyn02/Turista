import React, { useState, useEffect, useRef } from "react";
import mapboxgl from "!mapbox-gl";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

const Map = (props) => {
  // const [mapInstance, setMapInstance] = useState(null);
  const [clickCoordinates, setClickCoordinates] = useState({ lng: 0, lat: 0 });
  const markerRef = useRef(null);

  const mapContainerRef = useRef(null);
  const [lng, setLng] = useState(() => {
    if (props.checkLng) {
      return props.checkLng;
    } else {
      return 121.0163;
    }
  });
  const [lat, setLat] = useState(() => {
    if (props.checkLat) {
      return props.checkLat;
    } else {
      return 14.3039;
    }
  });
  const [zoom] = useState(12.5);

  console.log(props.checkLat);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/outdoors-v12",
      center: [lng, lat],
      zoom: zoom,
    });

    map.on("load", () => {
      // setMapInstance(map);
      map.resize();
      //   if (markers) {
      //     console.log("there is a marker");
      //   }
      if (props.checkLat && props.checkLng) {
        // new mapboxgl.Marker().setLngLat([marker.lng, marker.lat]).addTo(map);
        new mapboxgl.Marker()
          .setLngLat([props.checkLng, props.checkLat])
          .addTo(map);

        return true;
      }
      //   }
      // });
    });

    if (!props.checkLat && !props.checkLng) {
      map.on("click", (e) => {
        setClickCoordinates({
          lng: e.lngLat.lng,
          lat: e.lngLat.lat,
        });

        if (markerRef.current) {
          markerRef.current.remove();
        }

        setLat(clickCoordinates.lat.toFixed(4));

        const newMarker = new mapboxgl.Marker()
          .setLngLat([e.lngLat.lng, e.lngLat.lat])
          .addTo(map);
        markerRef.current = newMarker;
        // new mapboxgl.Marker().setLngLat([e.lngLat.lng, e.lngLat.lat]).addTo(map);
      });
    }

    return () => {
      map.remove();
    };
  }, []);

  useEffect(() => {
    setLat(clickCoordinates.lat.toFixed(4));
    setLng(clickCoordinates.lng.toFixed(4));
  }, [clickCoordinates]);

  // useEffect(() => {
  //   if (!mapInstance || !markers) return;

  //   markers.map((marker) => {
  //     new mapboxgl.Marker()
  //       .setLngLat([marker.lng, marker.lat])
  //       .addTo(mapInstance);
  //     return true;
  //   });
  // }, [mapInstance, markers]);

  const handleMapCoordinates = () => {
    props.onMarkerClick(clickCoordinates);
  };

  if (props.checkLat && props.checkLng) {
    return (
      <>
        <div className="sidebar">
          Longitude: {props.checkLng.toFixed(4)} | Latitude:{" "}
          {props.checkLat.toFixed(4)}
        </div>
        <div
          ref={mapContainerRef}
          className="map-container"
          coordinates={clickCoordinates}
        />
      </>
    );
  }
  return (
    <>
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat}
      </div>
      <div
        ref={mapContainerRef}
        className="map-container"
        coordinates={clickCoordinates}
      />
      <button onClick={handleMapCoordinates}>Save</button>
    </>
  );
};

export default Map;
