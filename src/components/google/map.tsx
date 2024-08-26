import type { ILocationMarker } from "@/types/components/google/types";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { Map, useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { useCallback, useEffect, useRef, useState } from "react";

const MapComponent = () => {
  const map = useMap();
  const placesLib = useMapsLibrary("places");

  const [placesService, setPlacesService] =
    useState<google.maps.places.PlacesService | null>(null);
  const [markers, setMarkers] = useState<ILocationMarker[]>([]);
  const markerClusterRef = useRef<MarkerClusterer | null>(null);

  useEffect(() => {
    if (!placesLib || !map) return;
    setPlacesService(new placesLib.PlacesService(map));
  }, [placesLib, map]);

  useEffect(() => {
    if (!placesService) return;

    const searchLocations = () => {
      placesService.nearbySearch(
        {
          location: { lat: 39.9612, lng: -82.9988 },
          radius: 14000,
          type: "cafe",
        },
        async (
          results: google.maps.places.PlaceResult[] | null,
          status: google.maps.places.PlacesServiceStatus,
        ) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && results) {
            setMarkers([]);
            for (const result of results) {
              if (result) {
                await addLocationMarker(result);
              }
            }
          } else {
            console.error("Places search failed:", status);
          }
        },
      );
    };

    searchLocations();
  }, [placesService]);

  useEffect(() => {
    if (!map || markers.length === 0) return;

    if (markerClusterRef.current) {
      markerClusterRef.current.clearMarkers();
    }

    const googleMarkers = markers.map((marker) => {
      const markerInstance = new google.maps.Marker({
        position: marker.position,
        title: `${marker.name} (${marker.isOpen ? "Open" : "Closed"})`,
      });

      markerInstance.addListener("click", () => handleMarkerClick(marker));
      return markerInstance;
    });

    markerClusterRef.current = new MarkerClusterer({
      map,
      markers: googleMarkers,
    });
  }, [map, markers]);

  const isLocationOpen = useCallback(
    async (placeId: string): Promise<boolean> => {
      return new Promise((resolve) => {
        if (!placesService) {
          resolve(false);
          return;
        }
        placesService.getDetails(
          {
            placeId: placeId,
            fields: ["opening_hours", "utc_offset_minutes"],
          },
          async (
            placeDetails: google.maps.places.PlaceResult | null,
            detailStatus: google.maps.places.PlacesServiceStatus,
          ) => {
            if (
              detailStatus === google.maps.places.PlacesServiceStatus.OK &&
              placeDetails &&
              placeDetails.opening_hours
            ) {
              resolve(placeDetails.opening_hours.isOpen() ?? false);
            } else {
              resolve(false);
            }
          },
        );
      });
    },
    [placesService],
  );

  const addLocationMarker = useCallback(
    async (location: google.maps.places.PlaceResult) => {
      if (
        !location.place_id ||
        !location.geometry ||
        !location.geometry.location
      )
        return;

      const isOpen = await isLocationOpen(location.place_id);

      if (markers.some((marker) => marker.id === location.place_id)) return;

      setMarkers((prev) => [
        ...prev,
        {
          id: `${location.place_id}`,
          name: `${location.name}`,
          position: {
            lat: location.geometry?.location?.lat() || 0,
            lng: location.geometry?.location?.lng() || 0,
          },
          isOpen: isOpen,
        },
      ]);
    },
    [isLocationOpen],
  );

  const handleMarkerClick = (marker: ILocationMarker) => {
    alert(
      `${marker.name} was clicked! It is currently ${marker.isOpen ? "open" : "closed"}.`,
    );
  };

  return (
    <Map
      style={{ width: "80dvw", height: "80dvh" }}
      defaultCenter={{ lat: 39.9612, lng: -82.9988 }}
      defaultZoom={11}
      gestureHandling={"greedy"}
      disableDefaultUI={true}
      mapId="COFFEE_MAP_ID"
    ></Map>
  );
};
export default MapComponent;
