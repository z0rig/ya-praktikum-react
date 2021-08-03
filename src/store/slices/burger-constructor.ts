import { createSlice } from '@reduxjs/toolkit';

import { postOrder } from './posted-order-details';
import { TBurgerConstructorIgredient } from '../../types';

interface IBurgerConstructorState {
  items: Array<TBurgerConstructorIgredient>;
  bun: TBurgerConstructorIgredient | null;
}

export const initialState: IBurgerConstructorState = {
  items: [],
  bun: null
};

const burgerConstructorSlice = createSlice( {
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addItem: ( state, { payload } ) => {
      state.items.push( payload );
    },
    removeItem: ( state, { payload } ) => {
      const itemIndex = state.items.findIndex( ( item ) => item._id === payload );
      state.items.splice( itemIndex, 1 );
    },
    swapItems: ( { items }, { payload: { from, to } } ) => {
      [items[from], items[to]] = [items[to], items[from]];
    },
    addBun: ( state, { payload: { bun } } ) => {
      if (
        ( state.bun === null ) ||
        ( state.bun && state.bun._id !== bun._id )
      ) {
        state.bun = bun;
      }
    },
  },
  extraReducers: ( builder ) => {
    builder
      .addCase( postOrder.fulfilled, () => initialState );
    }
} );

export default burgerConstructorSlice.reducer;
export const { addItem, removeItem, addBun, swapItems } = burgerConstructorSlice.actions;
