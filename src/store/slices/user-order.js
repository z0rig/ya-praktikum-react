import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  orderData: null,
  loading: false,
  error: null,
};

const getOrderById = createAsyncThunk(
  'userOrder',
  async ( id, { extra } ) => {
    const response = await extra.getOrderById( id );
    const json = await response.json();
    return json;
  }
);

const userOrderSlice = createSlice( {
  name: 'userOrder',
  initialState,
  reducers: {},
  extraReducers: ( builder ) => {
    builder
      .addCase( getOrderById.fulfilled, ( state, action ) => {
        state.loading = false;
        state.orderData = action.payload;
      } )
      .addCase( getOrderById.pending, ( state ) => {
        state.loading = true;
        state.error = false;
      } )
      .addCase( getOrderById.rejected, ( state, action ) => {
        state.loading = false;
        state.error = action.error;
        state.orderData = null;
      } );
  },
} );

export { getOrderById };
export default userOrderSlice.reducer;
