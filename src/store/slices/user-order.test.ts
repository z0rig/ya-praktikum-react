import userOrderReducer from './user-order';
import { initialState } from './user-order';
import { getOrderById } from './user-order';

describe( 'user order reducer', () => {
  it( 'should return the initial state', () => {
    expect( userOrderReducer( undefined, {} ) )
      .toEqual( initialState );
  } );

  it( 'should handle getOrderById fulfilled', () => {
    const payload = { number: '1102' };
    expect( userOrderReducer(
      initialState,
      getOrderById.fulfilled( payload )
    ) )
    .toEqual( { ...initialState, orderData: payload } );
  } );

  it( 'should handle getOrderById pending', () => {
    expect( userOrderReducer(
      initialState,
      getOrderById.pending()
    ) )
    .toEqual( { ...initialState, loading: true } );
  } );

  it( 'should handle getOrderById rejected', () => {
    expect( userOrderReducer(
      initialState,
      getOrderById.rejected( 'error' )
    ) )
    .toEqual( { ...initialState, error: { message: 'error' } } );
  } );
} );
