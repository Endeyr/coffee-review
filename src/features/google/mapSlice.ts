import { createAppSlice } from "@/app/createAppSlice";
import type { RootState } from "@/app/store";
import type { ILocationMarker } from "@/types/components/google/types";
import type { ILocation, IMapState } from "@/types/features/google/types";
import { createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import mapService from "./mapService";

const initialState: IMapState = {
  markers: [],
  placesService: null,
  isError: false,
  isSuccess: false,
  isLoading: true,
  message: "",
};

export const searchLocationThunk = createAsyncThunk<
  ILocationMarker[],
  { location: ILocation; radius: number; type: string },
  { state: RootState; rejectValue: string }
>("map/searchLocation", async (params, thunkAPI) => {
  const { location, radius, type } = params;
  const { map } = thunkAPI.getState();
  if (!map.placesService) {
    return thunkAPI.rejectWithValue("Places service not initialized");
  }
  try {
    const locations = await mapService.searchLocation(
      map.placesService,
      location,
      radius,
      type,
    );
    if (!locations || locations.length === 0)
      return thunkAPI.rejectWithValue("No locations found");

    const newMarkers = await mapService.addLocationMarker(
      map.placesService,
      map.markers,
      locations,
    );
    if (newMarkers.length === map.markers.length)
      return thunkAPI.rejectWithValue("No new markers added");
    return newMarkers;
  } catch (error: unknown) {
    const message =
      error instanceof Error
        ? error.message
        : "An unknown error occurred in searchLocationThunk";
    return thunkAPI.rejectWithValue(message);
  }
});

export const isLocationOpenThunk = createAsyncThunk<
  boolean,
  string,
  { state: RootState; rejectValue: string }
>("map/isLocationOpen", async (placeId, thunkAPI) => {
  const { map } = thunkAPI.getState();
  if (!map.placesService) {
    return thunkAPI.rejectWithValue("Places service not initialized");
  }
  try {
    return await mapService.isLocationOpen(map.placesService, placeId);
  } catch (error: unknown) {
    const message =
      error instanceof Error
        ? error.message
        : "An unknown error occurred in isLocationOpenThunk";
    return thunkAPI.rejectWithValue(message);
  }
});

export const mapSlice = createAppSlice({
  name: "map",
  initialState,
  reducers: {
    setPlacesService: (
      state,
      action: PayloadAction<google.maps.places.PlacesService | null>,
    ) => {
      state.placesService = action.payload;
    },
    mapReset: (state) => {
      state.markers = [];
      state.placesService = null;
      state.isError = false;
      state.isLoading = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(searchLocationThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(searchLocationThunk.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.message = "Error searching for places at location";
    });
    builder.addCase(
      searchLocationThunk.fulfilled,
      (state, action: PayloadAction<ILocationMarker[]>) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        if (action.payload) state.markers = action.payload;
        state.message = "Places found at location";
      },
    );
    builder.addCase(isLocationOpenThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(isLocationOpenThunk.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.message = "Error checking location hours";
    });
    builder.addCase(
      isLocationOpenThunk.fulfilled,
      (state, action: PayloadAction<boolean>) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Successfully found location hours";
        console.log(action.payload);
      },
    );
  },
});

export const { mapReset, setPlacesService } = mapSlice.actions;
export default mapSlice.reducer;
