import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: null,
};

const resetPassword = createAsyncThunk(
  'resetPasswordPage/reset',
  async ( userData, { extra } ) => {
    const response = await extra.resetPassword( userData );

    const json = await response.json();

    if ( !json.success ) {
      throw new Error( json.message );
    }
    return json;
  }
);

const resetPasswordPageSlice = createSlice( {
  name: 'resetPasswordPage',
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

export default resetPasswordPageSlice.reducer;
