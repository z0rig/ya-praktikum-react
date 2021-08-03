import { createSlice } from '@reduxjs/toolkit';
import { TUserOrderData } from '../../types';

interface IUserOrdersFeedState {
  orders: TUserOrderData[];
  wsConnected: boolean;
  error: boolean;
}

export const initialState: IUserOrdersFeedState = {
  orders: [],
  wsConnected: false,
  error: false,
};

const userOrdersFeedSlice = createSlice( {
  name: 'userOrdersFeed',
  initialState,
  reducers: {
    wsConnectionSuccess: ( state ) => {
      state.wsConnected = true;
      state.error = false;
    },
    wsConnectionError: ( state ) => {
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
