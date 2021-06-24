import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  orderDetails: null,
  loading: false,
  error: null,
};

const postOrder = createAsyncThunk(
  'orderDetails/postOrder',
  async ( ingredientsIds, { extra } ) => {
    const response = await extra.getOrderDetails( ingredientsIds );
    const json = await response.json();
    return json;
  }
);

const orderDetailsSlice = createSlice( {
  name: 'orderDetails',
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
        state.error = false;
      } )
      .addCase( postOrder.rejected, ( state, action ) => {
        state.loading = false;
        state.error = action.error;
        state.orderDetails = null;
      } );
  },
} );

export { postOrder };
export default orderDetailsSlice.reducer;
