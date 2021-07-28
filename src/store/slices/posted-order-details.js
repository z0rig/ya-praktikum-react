import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const initialState = {
  orderDetails: null,
  loading: false,
  error: null,
};

const postOrder = createAsyncThunk(
  'postedOrderDetails/postOrder',
  async ( ingredientsIds, { extra } ) => {
    const response = await extra.getOrderDetails( ingredientsIds );
    const json = await response.json();
    return json;
  }
);

const postedOrderDetailsSlice = createSlice( {
  name: 'postedOrderDetails',
  initialState,
  reducers: {},
  extraReducers: ( builder ) => {
    builder
      .addCase( postOrder.fulfilled, ( state, action ) => {
        state.loading = false;
        state.orderDetails = action.payload;
      } )
      .addCase( postOrder.pending, ( state ) => {
        state.loading = true;
        state.error = null;
      } )
      .addCase( postOrder.rejected, ( state, action ) => {
        state.loading = false;
        state.error = action.error;
        state.orderDetails = null;
      } );
  },
} );

export { postOrder };
export default postedOrderDetailsSlice.reducer;
