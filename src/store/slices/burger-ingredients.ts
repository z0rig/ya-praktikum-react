import { createAsyncThunk, createSlice, SerializedError } from '@reduxjs/toolkit';

import { addItem, removeItem, addBun } from './burger-constructor';
import { postOrder } from './posted-order-details';

import { IAsyncThunkExtraArgument, TIngredient } from '../../types';

interface IBurgerIngredientsState {
  items: Array<TIngredient>;
  loading: boolean;
  error: SerializedError | null;
}

export const initialState: IBurgerIngredientsState = {
  items: [],
  loading: false,
  error: null,
};

const fetchIngredients = createAsyncThunk <
    Array<TIngredient>,
    void,
    IAsyncThunkExtraArgument
  >
  (
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
      .addCase( fetchIngredients.pending, ( state ) => {
        state.loading = true;
      } )
      .addCase( fetchIngredients.rejected, ( state, action ) => {
        state.loading = false;
        state.error = action.error;
        state.items = [];
      } )
      .addCase( addItem, ( state, { payload } ) => {
        const ingredient = state.items.find( ( item ) => item._id === payload._id );

        if ( ingredient ){
          if ( ingredient.quantity ) {
            ++ingredient.quantity;
          } else {
            ingredient.quantity = 1;
          }
        }
      } )
      .addCase( removeItem, ( state, { payload } ) => {
        const item = state.items.find( ( item ) => item._id === payload );
        item?.quantity && --item.quantity;
      } )
      .addCase( addBun, ( state, { payload: { bun, activeBun } } ) => {
        if ( activeBun !== null ) {
          const pastBun = state.items
            .find( ( item ) => item._id === activeBun._id );
          if ( pastBun !== undefined ) {
           pastBun.quantity = 0;
          }
        }

        const currentBun = state.items.find( ( item ) => item._id === bun._id );
        if( currentBun ) currentBun.quantity = 1;
      } )
      .addCase( postOrder.fulfilled, ( state ) => {
        state.items.forEach( ( ingredient ) => {
          if ( ingredient.quantity ) {
          ingredient.quantity = 0;
        }} );
      } );
  },
} );

export { fetchIngredients };

export default burgerIngredientsSlice.reducer;
