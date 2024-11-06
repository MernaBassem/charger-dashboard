// src/redux/slices/locationSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LocationState {
  lng: number | null;
  lat: number | null;
  street: string;
  city: string;
}

const initialState: LocationState = {
  lng: null,
  lat: null,
  street: '',
  city: '',
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setLocation: (state, action: PayloadAction<LocationState>) => {
      const { lng, lat, street, city } = action.payload;
      state.lng = lng;
      state.lat = lat;
      state.street = street;
      state.city = city;
    },
  },
});

export const { setLocation } = locationSlice.actions;
export default locationSlice.reducer;
