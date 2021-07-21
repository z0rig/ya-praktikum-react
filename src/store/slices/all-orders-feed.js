import { createSlice } from '@reduxjs/toolkit';

const initialState = {
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
    wsConnectionError: ( state, action ) => {
      state.wsConnected = false;
      state.error = action.payload;
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
