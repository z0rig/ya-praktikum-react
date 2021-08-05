import { createAsyncThunk, createSlice, SerializedError } from '@reduxjs/toolkit';
import { IAsyncThunkExtraArgument, TUserData } from '../../types';

interface IResetPasswordState {
  loading: boolean;
  error: SerializedError | null;
}

export const initialState: IResetPasswordState = {
  loading: false,
  error: null,
};

const resetPassword = createAsyncThunk<
  void,
  TUserData,
  IAsyncThunkExtraArgument
>
(
  'resetPassword/reset',
  async ( userData, { extra } ) => {
    const response = await extra.resetPassword( userData );

    const json = await response.json();

    if ( !json.success ) {
      throw new Error( json.message );
    }
    return json;
  }
);

const resetPasswordSlice = createSlice( {
  name: 'resetPassword',
  initialState,
  reducers: {},
  extraReducers: ( builder ) => {
    builder.addCase( resetPassword.fulfilled, ( state ) => {
      state.loading = false;
      state.error = null;
    } )
    .addCase( resetPassword.pending, ( state ) => {
      state.loading = true;
    } )
    .addCase( resetPassword.rejected, ( state, action ) => {
      state.loading = false;
      state.error = action.error;
    } );
  }
} );

export { resetPassword };

export default resetPasswordSlice.reducer;
