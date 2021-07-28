import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const initialState = {
  emailChecked: false,
  loading: false,
  error: null,
};

const checkEmailForPassReset = createAsyncThunk(
  'forgotPassword/checkEmailForPassReset',
  async ( email, { extra } ) => {
    const response = await extra.checkEmailForPassReset( email );
    const json = await response.json();

    if ( !json.success ) {
      throw new Error( json.message );
    }

    return json.success;
  }
);

const forgotPasswordSlice = createSlice( {
  name: 'forgotPassword',
  initialState,
  reducers: {},
  extraReducers: ( builder ) => {
    builder
      .addCase( checkEmailForPassReset.fulfilled, ( state ) => {
      state.loading = false;
      state.error = null;
      state.emailChecked = true;
    } )
    .addCase( checkEmailForPassReset.pending, ( state ) => {
      state.loading = true;
      state.error = false;
    } )
    .addCase( checkEmailForPassReset.rejected, ( state, action ) => {
      state.loading = false;
      state.error = action.error;
    } );
  }
} );

export { checkEmailForPassReset };

export default forgotPasswordSlice.reducer;
