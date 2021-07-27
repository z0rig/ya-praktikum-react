import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  orders: [],
  total: null,
  totalToday: null,
  wsConnected: false,
  error: null,
};

const allOrdersFeedSlice = createSlice( {
  name: 'allOrdersFeed',
  initialState,
  reducers: {
    wsConnectionSuccess: ( state ) => {
      state.wsConnected = true;
      state.error = null;
    },
    wsConnectionError: ( state ) => {
      state.wsConnected = false;
      state.error = true;
    },
    wsConnectionClosed: ( state ) => {
      state.wsConnected = false;
    },
    wsGetMessage: ( state, action ) => {
      const { orders, total, totalToday, success } = action.payload;
      if ( !success ) {
        state.error = true;
        return;
      };

      state.orders = orders;
      state.total = total;
      state.totalToday = totalToday;
    }
  },
} );

export default allOrdersFeedSlice.reducer;
export const {
  wsConnectionSuccess,
  wsConnectionError,
  wsConnectionClosed,
  wsGetMessage
} = allOrdersFeedSlice.actions;
