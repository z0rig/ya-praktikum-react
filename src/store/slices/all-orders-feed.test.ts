import allOrdersFeedReducer from './all-orders-feed';

import {
  wsConnectionSuccess,
  wsConnectionError,
  wsConnectionClosed,
  wsGetMessage
} from './all-orders-feed';

import { initialState } from './all-orders-feed';

describe( 'all orders reducer', () => {
  it( 'should return the initial state', () => {
    expect( allOrdersFeedReducer( undefined, { type: '' } ) )
      .toEqual( initialState );
  } );

  it( 'should handle ws connection success', () => {
    expect(
      allOrdersFeedReducer(
        initialState,
        wsConnectionSuccess()
      )
    ).toEqual( {
      ...initialState,
      wsConnected: true
    } );
  } );

  it( 'should handle ws connection error', () => {
    expect(
      allOrdersFeedReducer(
        initialState,
        wsConnectionError()
      )
    ).toEqual( {
      ...initialState,
      error: true,
    } );
  } );

  it( 'should handle ws connection closed', () => {
    expect(
      allOrdersFeedReducer(
        initialState,
        wsConnectionClosed()
      )
    ).toEqual( {
      ...initialState,
      wsConnected: false,
    } );
  } );

  it( 'should handle ws connection success message', () => {
    const payload = {
      orders: [{}],
      total: 22,
      totalToday: 33,
      success: true
    };

    expect(
      allOrdersFeedReducer(
        initialState,
        wsGetMessage( payload )
      )
    ).toEqual( {
      ...initialState,
      orders: payload.orders,
      total: payload.total,
      totalToday: payload.totalToday
    } );
  } );

  it( 'should handle ws connection failed message', () => {
    const payload = {
      success: false
   };

    expect(
      allOrdersFeedReducer(
        initialState,
        wsGetMessage( payload )
      )
    ).toEqual( {
      ...initialState,
      error: true,
    } );
  } );
} );
