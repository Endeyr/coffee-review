import { createAppSlice } from "@/app/createAppSlice";
import type { RootState } from "@/app/store";
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
  google.maps.places.PlaceResult[] | null,
  { location: ILocation; radius: number; type: string },
  { state: RootState; rejectValue: string }
>("map/searchLocation", async (params, thunkAPI) => {
  const { location, radius, type } = params;
  const { map } = thunkAPI.getState();
  if (!map.placesService) {
    return thunkAPI.rejectWithValue("Places service not initialized");
  }
  try {
    return await mapService.searchLocation(
      map.placesService,
      location,
      radius,
      type,
    );
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
    builder.addCase(searchLocationThunk.fulfilled, (state) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = true;
      state.message = "Places found at location";
    });
    builder.addCase(isLocationOpenThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(isLocationOpenThunk.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.message = "Error checking location hours";
    });
    builder.addCase(isLocationOpenThunk.fulfilled, (state) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = true;
      state.message = "Successfully found location hours";
    });
  },
});

export const { mapReset, setPlacesService } = mapSlice.actions;
export default mapSlice.reducer;
