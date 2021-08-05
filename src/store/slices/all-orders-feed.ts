import { createSlice } from '@reduxjs/toolkit';
import { TUserOrderData } from '../../types';

interface IAllOrdersFeedState {
  orders: TUserOrderData[];
  total: number;
  totalToday: number;
  wsConnected: boolean;
  error: boolean;
}

export const initialState: IAllOrdersFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  wsConnected: false,
  error: false,
};

const allOrdersFeedSlice = createSlice( {
  name: 'allOrdersFeed',
  initialState,
  reducers: {
    wsConnectionSuccess: ( state ) => {
      state.wsConnected = true;
      state.error = false;
    },
    wsConnectionError: ( state ) => {
      state.wsConnected = false;
      state.error = true ;
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
