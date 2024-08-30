import type { ILocationMarker } from "@/types/components/google/types";
import {
  validateLatitude,
  validateLongitude,
  type ILocation,
} from "@/types/features/google/types";

const isLocationOpen = async (
  placesService: google.maps.places.PlacesService | null,
  placeId: string,
): Promise<boolean> => {
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
      (
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
};

const googleMarkers = (
  markers: ILocationMarker[],
  handleMarkerClick: (marker: ILocationMarker) => void,
): google.maps.Marker[] => {
  return markers.map((marker) => {
    const markerInstance = new google.maps.Marker({
      position: marker.position,
      title: `${marker.name} (${marker.isOpen ? "Open" : "Closed"})`,
    });
    markerInstance.addListener("click", () => handleMarkerClick(marker));
    return markerInstance;
  });
};

const searchLocation = async (
  placesService: google.maps.places.PlacesService,
  location: ILocation,
  radius: number,
  type: string,
): Promise<google.maps.places.PlaceResult[] | null> => {
  return new Promise((resolve) => {
    placesService.nearbySearch(
      {
        location: { lat: location.position.lat, lng: location.position.lng },
        radius,
        type,
      },
      (
        results: google.maps.places.PlaceResult[] | null,
        status: google.maps.places.PlacesServiceStatus,
      ) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          resolve(results);
        } else {
          console.error("Places search failed:", status);
          resolve(null);
        }
      },
    );
  });
};

const addLocationMarker = async (
  placesService: google.maps.places.PlacesService,
  markers: ILocationMarker[],
  locations: google.maps.places.PlaceResult[],
): Promise<ILocationMarker[]> => {
  const newMarkers = [...markers];
  for (const location of locations) {
    if (!location.place_id || !location.geometry || !location.geometry.location)
      continue;

    const isOpen = await isLocationOpen(placesService, location.place_id);

    if (newMarkers.some((marker) => marker.id === location.place_id)) continue;

    try {
      const lat = validateLatitude(location.geometry.location.lat());
      const lng = validateLongitude(location.geometry.location.lng());

      newMarkers.push({
        id: `${location.place_id}`,
        name: `${location.name}`,
        position: {
          lat,
          lng,
        },
        isOpen: isOpen,
      });
    } catch (error: unknown) {
      console.error(
        `Invalid coordinates for location ${location.name}:`,
        error,
      );
      continue;
    }
  }
  return newMarkers;
};

const mapService = {
  searchLocation,
  googleMarkers,
  isLocationOpen,
  addLocationMarker,
};

export default mapService;
