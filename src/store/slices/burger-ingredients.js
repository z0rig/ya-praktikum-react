import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const fetchIngredients = createAsyncThunk(
  'burgerIngredients/fetchData',
  async ( _, { extra } ) => {
    const response = await extra.getIngredienst();
    const json = await response.json();
    return json.data;
  }
);

const burgerIngredientsSlice = createSlice( {
  name: 'burgerIngredients',
  initialState,
  reducers: {},
  extraReducers: ( builder ) => {
    builder
      .addCase( fetchIngredients.fulfilled, ( state, action ) => {
        state.loading = false;
        state.items = action.payload;
      } )
      .addCase( fetchIngredients.pending, ( state, action ) => {
        state.loading = true;
      } )
      .addCase( fetchIngredients.rejected, ( state, action ) => {
        state.loading = false;
        state.error = action.error;
        state.items = [];
      } );
  },
} );

export { fetchIngredients };
export default burgerIngredientsSlice.reducer;
