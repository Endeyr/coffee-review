import type { ILocationMarker } from "./../../components/google/types";
type Latitude = number & { __brand: "Latitude" };
type Longitude = number & { __brand: "Longitude" };

export function validateLatitude(lat: number): Latitude {
  if (lat < -90 || lat > 90) {
    throw new Error("Latitude must be between -90 and 90 degrees");
  }
  return lat as Latitude;
}

export function validateLongitude(lng: number): Longitude {
  if (lng < -180 || lng > 180) {
    throw new Error("Longitude must be between -180 and 180 degrees");
  }
  return lng as Longitude;
}

export interface ILocation extends google.maps.places.PlaceResult {
  position: {
    lat: Latitude;
    lng: Longitude;
  };
  geometry?: google.maps.places.PlaceResult["geometry"];
}

export interface IMapState {
  markers: ILocationMarker[];
  placesService: google.maps.places.PlacesService | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}
