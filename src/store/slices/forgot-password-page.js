import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  emailChecked: false,
  loading: false,
  error: null,
};

const checkEmailForPassReset = createAsyncThunk(
  'forgotPasswordPage/checkEmailForPassReset',
  async ( email, { extra } ) => {
    const response = await extra.checkEmailForPassReset( email );
    const json = await response.json();

    if ( !json.success ) {
      throw new Error( json.message );
    }

    return json.success;
  }
);

const forgotPasswordPageSlice = createSlice( {
  name: 'forgotPasswordPage',
  initialState,
  reducers: {},
  extraReducers: ( builder ) => {
    builder.addCase( checkEmailForPassReset.fulfilled, ( state ) => {
      state.loading = false;
      state.error = null;
      state.emailChecked = true;
    } )
    .addCase( checkEmailForPassReset.pending, ( state ) => {
      state.loading = true;
    } )
    .addCase( checkEmailForPassReset.rejected, ( state, action ) => {
      state.loading = false;
      state.error = action.error;
    } );
  }
} );

export { checkEmailForPassReset };

export default forgotPasswordPageSlice.reducer;
