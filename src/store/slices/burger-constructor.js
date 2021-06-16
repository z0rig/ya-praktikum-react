import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [{
    calories: 420,
    carbohydrates: 53,
    fat: 24,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    name: 'Краторная булка N-200i',
    price: 1255,
    proteins: 80,
    type: 'bun',
    __v: 0,
    _id: '60c9dcba45f4920027090275',
  }],
  bun: {
    calories: 420,
    carbohydrates: 53,
    fat: 24,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    name: 'Краторная булка N-200i',
    price: 1255,
    proteins: 80,
    type: 'bun',
    __v: 0,
    _id: '60c9dcba45f4920027090275',
  }
};

const burgerConstructorSlice = createSlice( {
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addItem: ( { items }, { payload } ) => {
      items.push( payload );
    },
    addBun: ( { bun }, { payload } ) => {
      bun = payload;
    }
  },
} );

export default burgerConstructorSlice.reducer;
export const { addItem, addBun } = burgerConstructorSlice.actions;
