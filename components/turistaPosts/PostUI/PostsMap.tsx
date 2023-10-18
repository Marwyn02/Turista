import React, { useState, useEffect, useRef, FC } from "react";
import mapboxgl from "mapbox-gl";

if (process.env.NEXT_PUBLIC_MAPBOX_TOKEN) {
  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
}

interface MapProps {
  checkLng?: number;
  checkLat?: number;
}

const PostsMap: FC<MapProps> = (props) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const [lng] = useState<number>(() => {
    if (props.checkLng) {
      return props.checkLng;
    } else {
      return 120.979;
    }
  });
  const [lat] = useState<number>(() => {
    if (props.checkLat) {
      return props.checkLat;
    } else {
      return 14.5828;
    }
  });
  const [zoom] = useState<number>(8);

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

      return () => {
        map.remove();
      };
    }
  }, []);
  return (
    <>
      <div ref={mapContainerRef} className="map-container" />
    </>
  );
};

export default PostsMap;
