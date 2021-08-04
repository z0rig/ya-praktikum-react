import registrationPageReducer from './registration';
import { register } from './registration';
import { initialState } from './registration';

describe( 'registration reducer', () => {
  it( 'should return the initial state', () => {
    expect( registrationPageReducer( undefined, {} ) )
      .toEqual( initialState );
  } );

  it( 'should handle register fulfilled', () => {
    expect( registrationPageReducer(
      initialState,
      register.fulfilled()
    ) )
    .toEqual( initialState );
  } );

  it( 'should handle register pending', () => {
    expect( registrationPageReducer(
      initialState,
      register.pending()
    ) )
    .toEqual( { ...initialState, loading: true } );
  } );

  it( 'should handle register rejected', () => {
    expect( registrationPageReducer(
      initialState,
      register.rejected( 'error' )
    ) )
    .toEqual( { ...initialState, error: { message: 'error' } } );
  } );
} );
