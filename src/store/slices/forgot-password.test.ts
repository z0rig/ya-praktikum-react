import forgotPasswordReducer from './forgot-password';
import { checkEmailForPassReset } from './forgot-password';
import { initialState } from './forgot-password';

describe( 'forgot password reducer', () => {
  it( 'should return the initial state', () => {
    expect( forgotPasswordReducer( undefined, {} ) )
      .toEqual( initialState );
  } );

  it( 'should handle checkEmailForPassReset fulfilled', () => {
    expect( forgotPasswordReducer(
      initialState,
      checkEmailForPassReset.fulfilled()
    ) )
    .toEqual( { ...initialState, emailChecked: true } );
  } );

  it( 'should handle checkEmailForPassReset pending', () => {
    expect( forgotPasswordReducer(
      initialState,
      checkEmailForPassReset.pending()
    ) )
    .toEqual( { ...initialState, loading: true, error: null } );
  } );

  it( 'should handle checkEmailForPassReset rejected', () => {
    expect( forgotPasswordReducer(
      initialState,
      checkEmailForPassReset.rejected( 'error' )
    ) )
    .toEqual( { ...initialState, error: { message: 'error' } } );
  } );
} );
