import resetPasswordPageReducer from './reset-password';
import { resetPassword } from './reset-password';
import { initialState } from './reset-password';

describe( 'reset password reducer', () => {
  it( 'should return the initial state', () => {
    expect( resetPasswordPageReducer( undefined, {} ) )
      .toEqual( initialState );
  } );

  it( 'should handle resetPassword fulfilled', () => {
    expect( resetPasswordPageReducer(
      initialState,
      resetPassword.fulfilled()
    ) )
    .toEqual( initialState );
  } );

  it( 'should handle resetPassword pending', () => {
    expect( resetPasswordPageReducer(
      initialState,
      resetPassword.pending()
    ) )
    .toEqual( { ...initialState, loading: true } );
  } );

  it( 'should handle resetPassword rejected', () => {
    expect( resetPasswordPageReducer(
      initialState,
      resetPassword.rejected( 'error' )
    ) )
    .toEqual( { ...initialState, error: { message: 'error' } } );
  } );
} );
