import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  orders: [],
  wsConnected: false,
  error: null,
};

const userOrdersFeedSlice = createSlice( {
  name: 'userOrdersFeed',
  initialState,
  reducers: {
    wsConnectionSuccess: ( state ) => {
      state.wsConnected = true;
      state.error = null;
    },
    wsConnectionError: ( state, action ) => {
      state.wsConnected = false;
      state.error = true;
    },
    wsConnectionClosed: ( state ) => {
      state.wsConnected = false;
    },
    wsGetMessage: ( state, action ) => {
      const { orders, success } = action.payload;
      if ( !success ) {
        state.error = true;
        return;
      };

      state.orders = orders;
    }
  },
} );

export default userOrdersFeedSlice.reducer;
export const {
  wsConnectionSuccess,
  wsConnectionError,
  wsConnectionClosed,
  wsGetMessage
} = userOrdersFeedSlice.actions;
