import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getAddress } from "../../services/apiGeocoding";

function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

export const fetchAddress = createAsyncThunk(
  "user/fetchAddress",
  async function () {
    const positionObj = await getPosition();
    const position = {
      latitude: positionObj.coords.latitude,
      longitude: positionObj.coords.longitude,
    };

    const addressObj = await getAddress(position);

    const address =
      addressObj.features[0].properties?.address_line2 ||
      addressObj.features[0].properties?.address_line2;

    return { position, address };
  },
);

const initialState = {
  username: "",
  status: "idle",
  position: {},
  address: "",
  error: "",
};

const userSlice = createSlice({
  initialState,
  name: "user",
  reducers: {
    updateUsername(state, action) {
      state.username = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAddress.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.position = action.payload.position;
        state.address = action.payload.address;
        state.status = "idle";
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        state.error =
          "There was an error with getting your address. Please input your address";
      });
  },
});

export const { updateUsername } = userSlice.actions;

export default userSlice.reducer;
