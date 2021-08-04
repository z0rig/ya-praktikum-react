import userOrdersFeedReducer from './user-orders-feed';
import { initialState } from './user-orders-feed';
import {
  wsConnectionSuccess,
  wsConnectionError,
  wsConnectionClosed,
  wsGetMessage
} from './user-orders-feed';

describe( 'user orders reducer', () => {
  it( 'should return the initial state', () => {
    expect( userOrdersFeedReducer( undefined, {} ) )
      .toEqual( initialState );
  } );

  it( 'should handle ws connection success', () => {
    expect(
      userOrdersFeedReducer(
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
      userOrdersFeedReducer(
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
      userOrdersFeedReducer(
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
      success: true
    };

    expect(
      userOrdersFeedReducer(
        initialState,
        wsGetMessage( payload )
      )
    ).toEqual( {
      ...initialState,
      orders: payload.orders,
    } );
  } );

  it( 'should handle ws connection failed message', () => {
    const payload = {
      success: false
   };

    expect(
      userOrdersFeedReducer(
        initialState,
        wsGetMessage( payload )
      )
    ).toEqual( {
      ...initialState,
      error: true,
    } );
  } );
} );
