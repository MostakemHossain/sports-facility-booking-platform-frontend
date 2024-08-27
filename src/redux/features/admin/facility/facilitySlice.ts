import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  facility: null,
  facilities: [],
};
const facility = createSlice({
  name: "facility",
  initialState,
  reducers: {
    setSingleFacility: (state, action) => {
      state.facility = action.payload;
    },
    setFacilities: (state, action) => {
      state.facilities = action.payload;
    },
  },
});

export const { setSingleFacility, setFacilities } = facility.actions;
export default facility.reducer;
