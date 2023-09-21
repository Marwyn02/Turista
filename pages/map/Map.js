import React, { useState, useEffect, useRef } from "react";
import mapboxgl from "!mapbox-gl";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

const Map = (props) => {
  const coordinatesRef = useRef({ lng: 0, lat: 0 });
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

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/outdoors-v12",
      center: [lng, lat],
      zoom: zoom,
    });

    map.on("load", () => {
      map.resize();

      if (props.checkLat && props.checkLng) {
        new mapboxgl.Marker()
          .setLngLat([props.checkLng, props.checkLat])
          .addTo(map);

        return true;
      }
    });

    if (!props.checkLat && !props.checkLng) {
      map.on("click", (e) => {
        coordinatesRef.current = {
          lng: e.lngLat.lng,
          lat: e.lngLat.lat,
        };

        if (markerRef.current) {
          markerRef.current.remove();
        }

        const newMarker = new mapboxgl.Marker()
          .setLngLat([e.lngLat.lng, e.lngLat.lat])
          .addTo(map);
        markerRef.current = newMarker;
      });
    }

    return () => {
      map.remove();
    };
  }, []);

  useEffect(() => {
    setLat(coordinatesRef.current.lat.toFixed(4));
    setLng(coordinatesRef.current.lng.toFixed(4));
  }, [coordinatesRef]);

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
    props.onMarkerClick(coordinatesRef.current);
  };

  if (props.checkLat && props.checkLng) {
    return (
      <>
        {/* <div className="sidebar">
          Longitude: {props.checkLng.toFixed(4)} | Latitude:{" "}
          {props.checkLat.toFixed(4)}
        </div> */}
        <div
          ref={mapContainerRef}
          className="map-container"
          coordinates={coordinatesRef.current}
        />
      </>
    );
  }
  return (
    <>
      <div
        ref={mapContainerRef}
        className="map-container"
        coordinates={coordinatesRef.current}
      />
      <button
        className="w-full py-1.5 mt-3 text-sm border border-black/50 rounded hover:bg-indigo-500 hover:border-indigo-500 hover:text-white duration-300"
        onClick={(e) => {
          e.preventDefault();
          handleMapCoordinates();
        }}
      >
        Save
      </button>
    </>
  );
};

export default Map;
