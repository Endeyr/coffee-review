import { useAppDispatch, useAppSelector } from "@/app/hooks";
import type { RootState } from "@/app/store";
import mapService from "@/features/google/mapService";
import {
  isLocationOpenThunk,
  searchLocationThunk,
} from "@/features/google/mapSlice";
import type { ILocationMarker } from "@/types/components/google/types";
import {
  validateLatitude,
  validateLongitude,
} from "@/types/features/google/types";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { Map, useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { useCallback, useEffect, useRef } from "react";

const MapComponent = () => {
  const dispatch = useAppDispatch();
  const map = useMap();
  const placesLib = useMapsLibrary("places");
  const markerClusterRef = useRef<MarkerClusterer | null>(null);
  const placesServiceRef = useRef<google.maps.places.PlacesService | null>(
    null,
  );
  const { markers } = useAppSelector((state: RootState) => state.map);

  // this will change to user input / geolocation
  const lat = validateLatitude(39.9612);
  const lng = validateLongitude(-82.9988);
  const radius = 14000;
  const type = "cafe";

  useEffect(() => {
    if (!placesLib || !map) return;
    placesServiceRef.current = new placesLib.PlacesService(map);
  }, [placesLib, map]);

  useEffect(() => {
    if (!placesServiceRef.current || !map) return;
    const searchLocations = () => {
      dispatch(
        searchLocationThunk({
          placesService:
            placesServiceRef.current as google.maps.places.PlacesService,
          location: { position: { lat, lng } },
          radius,
          type,
        }),
      );
    };

    searchLocations();
  }, [dispatch, lat, lng, radius, type, map]);

  useEffect(() => {
    if (!map || markers.length === 0) return;

    if (markerClusterRef.current) {
      markerClusterRef.current.clearMarkers();
    }

    const googleMarkers = mapService.googleMarkers(markers, handleMarkerClick);

    markerClusterRef.current = new MarkerClusterer({
      map,
      markers: googleMarkers,
    });
  }, [map, markers]);

  const handleMarkerClick = useCallback(
    async (marker: ILocationMarker) => {
      if (!placesServiceRef.current) return;

      dispatch(
        isLocationOpenThunk({
          placesService: placesServiceRef.current,
          placeId: marker.id,
        }),
      );

      // TODO Popup with location info
      alert(`${marker.name} was clicked!`);
    },
    [dispatch],
  );

  return (
    <>
      <Map
        style={{ width: "80dvw", height: "80dvh" }}
        defaultCenter={{ lat, lng }}
        defaultZoom={11}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
        mapId="COFFEE_MAP_ID"
      ></Map>
    </>
  );
};
export default MapComponent;
