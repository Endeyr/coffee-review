import type { ILocationMarker } from "@/types/components/google/types";
import type { ILocation } from "@/types/features/google/types";

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
      { location: { lat: location.lat, lng: location.lng }, radius, type },
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

const mapService = {
  searchLocation,
  googleMarkers,
  isLocationOpen,
};

export default mapService;
