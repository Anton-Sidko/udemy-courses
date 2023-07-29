import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../types';

import { getAddress } from '../../services/apiGeocoding';

type AddressType = {
  locality?: string;
  city?: string;
  postcode?: string;
  countryName?: string;
};

type PositionObjType = {
  coords: { latitude: string; longitude: string };
};

function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

export const fetchAddress = createAsyncThunk(
  'user/fetchAddress',
  async function () {
    // 1) We get the user's geolocation position
    const positionObj = await getPosition();
    const position = {
      latitude: (positionObj as PositionObjType).coords.latitude,
      longitude: (positionObj as PositionObjType).coords.longitude,
    };

    // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
    const addressObj: AddressType = await getAddress(position);
    const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

    // 3) Then we return an object with the data that we are interested in
    // Payload of the FULFILLED state
    return { position, address };
  },
);

const initialState = {
  username: '',
  status: 'idle',
  position: {},
  address: '',
  error: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateName(state, action) {
      state.username = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchAddress.pending, (state) => {
        state.status = 'loading';
        state.position = {};
        state.address = '';
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.position = action.payload.position;
        state.address = action.payload.address;
        state.status = 'idle';
      })
      .addCase(fetchAddress.rejected, (state) => {
        state.status = 'error';
        state.error =
          'There was a problem getting your address. Make sure to fill this field!';
      }),
});

export const getUser = (state: RootState) => state.user;
export const getUsername = (state: RootState) => state.user.username;

export const { updateName } = userSlice.actions;

export default userSlice.reducer;
