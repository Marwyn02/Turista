import React, { useState, useEffect, useRef, FC } from "react";
import mapboxgl, { Map as MapboxMap, Marker } from "mapbox-gl";

if (process.env.NEXT_PUBLIC_MAPBOX_TOKEN) {
  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
}

interface MapProps {
  checkLng?: number;
  checkLat?: number;
  onMarkerClick: (coordinates: { lng: number; lat: number }) => void;
}

const AddMap: FC<MapProps> = (props) => {
  const coordinatesRef = useRef<{ lng: number; lat: number }>({
    lng: 0,
    lat: 0,
  });
  const markerRef = useRef<Marker | null>(null);
  const [marked, setMarked] = useState<boolean>(false);

  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const [lng, setLng] = useState<number>(() => {
    if (props.checkLng) {
      return props.checkLng;
    } else {
      return 120.979;
    }
  });
  const [lat, setLat] = useState<number>(() => {
    if (props.checkLat) {
      return props.checkLat;
    } else {
      return 14.5828;
    }
  });
  const [zoom] = useState<number>(8);

  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (mapContainerRef.current) {
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
        map.on("click", (e: any) => {
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
    }
  }, []);

  useEffect(() => {
    const newLat = coordinatesRef.current.lat.toFixed(4);
    const newLng = coordinatesRef.current.lng.toFixed(4);

    setLat(parseFloat(newLat));
    setLng(parseFloat(newLng));
  }, [coordinatesRef]);

  //
  //
  //
  // This only for adding marking the location for the map

  const handleMapCoordinates = () => {
    if (coordinatesRef.current.lat === 0 || coordinatesRef.current.lng === 0) {
      setError("Unknown location");
      return;
    }
    setMarked(true);
    setError("");
    props.onMarkerClick(coordinatesRef.current);
  };

  return (
    <>
      <div ref={mapContainerRef} className="map-container" />
      <p className="text-sm text-red-500 mt-0.5">{error}</p>
      {marked ? (
        <button
          className="w-full py-1.5 mt-3 text-sm border border-gray-200 rounded bg-gray-200 text-gray-500"
          disabled
        >
          Marked
        </button>
      ) : (
        <button
          type="button"
          className="w-full py-1.5 mt-3 text-sm border border-black/50 rounded 
                hover:bg-indigo-500 hover:border-indigo-500 hover:text-white 
                  duration-300"
          onClick={(e) => {
            e.preventDefault();
            handleMapCoordinates();
          }}
        >
          Mark location
        </button>
      )}
    </>
  );
};

export default AddMap;
