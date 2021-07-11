import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { setCookie } from '../../utils/cookie';

const initialState = {
  loading: false,
  error: null,
};

const login = createAsyncThunk(
  'loginPage/login',
  async ( userData, { extra } ) => {
    const response = await extra.login( userData );
    const json = await response.json();

    if ( !json.success ) {
      throw new Error( json.message );
    }

    const { accessToken, refreshToken } = json;

    setCookie( 'token', accessToken, { 'max-age': 1200 } );
    setCookie( 'refreshToken', refreshToken, { 'max-age': 120000 } );

    return json;
  }
);

const loginPageSlice = createSlice( {
  name: 'loginPage',
  initialState,
  reducers: {},
  extraReducers: ( builder ) => {
    builder.addCase( login.fulfilled, ( state ) => {
      state.loading = false;
      state.error = null;
    } )
    .addCase( login.pending, ( state ) => {
      state.loading = true;
    } )
    .addCase( login.rejected, ( state, action ) => {
      state.loading = false;
      state.error = action.error;
    } );
  }
} );

export { login };

export default loginPageSlice.reducer;
