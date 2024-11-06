//pages/map/index.jsx
import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { setLocation } from '../../Redux/Slices/locationSlice';

import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

const Map = () => {
  const mapContainerRef = useRef();
  const mapRef = useRef();
  const markerRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiaG5lZnV0dXJlcyIsImEiOiJjbGU0ZHR0ZXQwMjNxM3F2emhmeWNodDZuIn0.gKO7Fo0x6-sk3wfyY0_Z3w";

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [-79.4512, 43.6568],
      zoom: 13,
    });

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
    });

    // Add the Geocoder to the map
    mapRef.current.addControl(geocoder);

    // Set marker on click and dispatch coordinates
    mapRef.current.on("click", async (e) => {

      const { lng, lat } = e.lngLat;

      // Set or move the marker
      if (markerRef.current) {
        markerRef.current.setLngLat([lng, lat]);
      } else {
        markerRef.current = new mapboxgl.Marker()
          .setLngLat([lng, lat])
          .addTo(mapRef.current);
      }

      // dispatch(setLocation({ lng, lat, street: "", city: "" }));
      // Use the Geocoder to reverse geocode the clicked location
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${mapboxgl.accessToken}`
      );
      const data = await response.json();

      if (data.features.length > 0) {
        const place = data.features[0];
        const street = place.place_name || ""; // The main text (usually street or place name)
        const city =
          place.context.find((c) => c.id.includes("place"))?.text || ""; // Find the city from the context

        // Dispatch the data to Redux store
        dispatch(setLocation({ lng, lat, street, city }));
      } else {
        // Handle the case where no features are found
        dispatch(setLocation({ lng, lat, street: "", city: "" }));
      }
    });

    // Listen for the result event from the Geocoder
    geocoder.on("result", (e) => {
      const place = e.result;
      const [lng, lat] = place.geometry.coordinates;
      const street = place.palce_name; // The main text (usually street or place name)
      const city =
        place?.context?.find((c) => c.id.includes("place"))?.text || ""; // Find the city from the context

      // Dispatch the data to Redux store
      dispatch(setLocation({ lng, lat, street, city }));
      // Move marker to geocoded location
      if (markerRef.current) {
        markerRef.current.setLngLat([lng, lat]);
      } else {
        markerRef.current = new mapboxgl.Marker()
          .setLngLat([lng, lat])
          .addTo(mapRef.current);
      }
    });

    return () => mapRef.current.remove();
  }, [dispatch]);

  return <div ref={mapContainerRef} style={{ height: '400px'}} />;
};

export default Map;
