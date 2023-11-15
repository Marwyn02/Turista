import React, { useState, useEffect, useRef, FC } from "react";
import mapboxgl, { Map as MapboxMap, Marker } from "mapbox-gl";

if (process.env.NEXT_PUBLIC_MAPBOX_TOKEN) {
  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
}

interface MapBoxProps {
  checkLng?: number;
  checkLat?: number;
  onMarkerClick: (coordinates: { lng: number; lat: number }) => void;
}

const Mapbox: FC<MapBoxProps> = (props) => {
  const coordinatesRef = useRef<{ lng: number; lat: number }>({
    lng: 0,
    lat: 0,
  });
  const markerRef = useRef<Marker | null>(null);
  const [marked, setMarked] = useState<boolean>(false);

  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const [lng, setLng] = useState<number>(props.checkLng || 120.979);
  const [lat, setLat] = useState<number>(props.checkLat || 14.5828);
  const [zoom] = useState<number>(8);

  //   Toggle State
  const [editToggle, setEditToggle] = useState<boolean>(false);

  //   Error State
  const [error, setError] = useState<boolean>(false);

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
  // This is for creating a new mark of the location for the map

  const handleMapCoordinates = () => {
    if (
      (!coordinatesRef.current ||
        coordinatesRef.current.lat === 0 ||
        coordinatesRef.current.lng === 0) &&
      (!props.checkLat || !props.checkLng)
    ) {
      setError(true);
      return;
    }
    setMarked(true);
    setError(false);
    props.onMarkerClick(coordinatesRef.current);
  };
  return (
    <>
      <div ref={mapContainerRef} className="map-container" />
      {error && (
        <p className="text-sm text-red-500 mt-0.5">Unknown location.</p>
      )}
      {marked ? (
        // Submitted State
        <button
          className="w-full py-1.5 mt-3 text-sm border border-gray-200 rounded bg-gray-200 text-gray-500"
          disabled
        >
          Marked
        </button>
      ) : (
        //   Normal state
        <section>
          <div>
            {(!props.checkLat && !props.checkLat) || editToggle ? (
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
                Mark {props.checkLat && props.checkLng ? "new" : ""} location
              </button>
            ) : null}

            {props.checkLat && props.checkLng && (
              <div className="text-sm text-gray-500 flex justify-end mt-2">
                <button
                  type="button"
                  onClick={() => setEditToggle(!editToggle)}
                >
                  {!editToggle ? "Edit" : "Cancel"}
                </button>
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default Mapbox;
