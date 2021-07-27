import loginReducer from './login';
import { login } from './login';
import { initialState } from './login';

describe( 'login reducer', () => {
  it( 'should return the initial state', () => {
    expect( loginReducer( undefined, {} ) )
      .toEqual( initialState );
  } );

  it( 'should handle login fulfilled', () => {
    expect( loginReducer(
      initialState,
      login.fulfilled()
    ) )
    .toEqual( initialState );
  } );

  it( 'should handle login pending', () => {
    expect( loginReducer(
      initialState,
      login.pending()
    ) )
    .toEqual( { ...initialState, loading: true } );
  } );

  it( 'should handle login rejected', () => {
    expect( loginReducer(
      initialState,
      login.rejected( 'error' )
    ) )
    .toEqual( { ...initialState, error: { message: 'error' } } );
  } );
} );
