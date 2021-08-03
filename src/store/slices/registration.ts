import { createAsyncThunk, createSlice, SerializedError } from '@reduxjs/toolkit';
import { IAsyncThunkExtraArgument, TUserData } from '../../types';
import { setCookie } from '../../utils/cookie';

interface IRegistrationState {
  loading: boolean;
  error: SerializedError | null;
}

export const initialState: IRegistrationState = {
  loading: false,
  error: null,
};

const register = createAsyncThunk<
  TUserData,
  TUserData,
  IAsyncThunkExtraArgument
>
(
  'registration/register',
  async ( userData, { extra } ) => {
    const response = await extra.register( userData );
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

const registrationSlice = createSlice( {
  name: 'registration',
  initialState,
  reducers: {},
  extraReducers: ( builder ) => {
    builder.addCase( register.fulfilled, ( state ) => {
      state.loading = false;
      state.error = null;
    } )
    .addCase( register.pending, ( state ) => {
      state.loading = true;
    } )
    .addCase( register.rejected, ( state, action ) => {
      state.loading = false;
      state.error = action.error;
    } );
  }
} );

export { register };
export default registrationSlice.reducer;
