import postedOrderDetails from './posted-order-details';
import { initialState } from './posted-order-details';
import { postOrder } from './posted-order-details';

describe( 'order details reducer', () => {
  it( 'should return the initial state', () => {
    expect( postedOrderDetails( undefined, {} ) )
      .toEqual( initialState );
  } );

  it( 'should handle postOrder fulfilled', () => {
    const payload = { _id: 'daed232' };
    expect( postedOrderDetails(
      initialState,
      postOrder.fulfilled( payload )
    ) )
    .toEqual( { ...initialState, orderDetails: payload } );
  } );

  it( 'should handle postOrder pending', () => {
    expect( postedOrderDetails(
      initialState,
      postOrder.pending()
    ) )
    .toEqual( { ...initialState, loading: true } );
  } );

  it( 'should handle postOrder rejected', () => {
    expect( postedOrderDetails(
      initialState,
      postOrder.rejected( 'error' )
    ) )
    .toEqual( { ...initialState, error: { message: 'error' } } );
  } );
} );
