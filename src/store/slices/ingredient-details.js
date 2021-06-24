import { createSlice } from '@reduxjs/toolkit';

const initialState = null;

const ingredientDetailsSlice = createSlice( {
  name: 'burgerIngredients',
  initialState,
  reducers: {
    setIngredient: ( _, { payload } ) => payload,
    resetIngredient: () => initialState
  },
} );

export default ingredientDetailsSlice.reducer;
export const {
  setIngredient,
  resetIngredient
} = ingredientDetailsSlice.actions;
