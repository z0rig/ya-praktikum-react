import profilePageReducer from './profile';
import { logout, getUserData, setUserData } from './profile';
import { initialState } from './profile';

describe( 'profile reducer', () => {
  it( 'should return the initial state', () => {
    expect( profilePageReducer( undefined, {} ) )
      .toEqual( initialState );
  } );

  it( 'should handle logout fulfilled', () => {
    expect( profilePageReducer(
      initialState,
      logout.fulfilled()
    ) )
    .toEqual( initialState );
  } );

  it( 'should handle logout pending', () => {
    expect( profilePageReducer(
      initialState,
      logout.pending()
    ) )
    .toEqual( {
      ...initialState,
      loading: true,
      error: null
    } );
  } );

  it( 'should handle logout rejected', () => {
    expect( profilePageReducer(
      initialState,
      logout.rejected( 'error' )
    ) )
    .toEqual( {
      ...initialState,
      loading: false,
      error: { message: 'error' }
    } );
  } );

  it( 'should handle getUserData fulfilled', () => {
    const payload = {
      user: {
        email: 'test',
        name: 'test'
      }
    };
    expect( profilePageReducer(
      initialState,
      getUserData.fulfilled( payload )
    ) )
    .toEqual( {
      ...initialState,
      user: {
        ...payload.user,
        isLogin: true
      }
    } );
  } );

  it( 'should handle getUserData pending', () => {
    expect( profilePageReducer(
      initialState,
      getUserData.pending()
    ) )
    .toEqual( { ...initialState, loading: true } );
  } );

  it( 'should handle getUserData rejected', () => {
    expect( profilePageReducer(
      initialState,
      getUserData.rejected( 'error' )
    ) )
    .toEqual( { ...initialState, error: { message: 'error' } } );
  } );

  it( 'should handle setUserData fulfilled', () => {
    const payload = {
      user: {
        email: 'test',
        name: 'test'
      }
    };
    expect( profilePageReducer(
      initialState,
      setUserData.fulfilled( payload )
    ) )
    .toEqual( {
      ...initialState,
      user: {
        ...payload.user,
        isLogin: true
      }
    } );
  } );

  it( 'should handle setUserData pending', () => {
    expect( profilePageReducer(
      initialState,
      setUserData.pending()
    ) )
    .toEqual( { ...initialState, loading: true } );
  } );

  it( 'should handle setUserData rejected', () => {
    expect( profilePageReducer(
      initialState,
      setUserData.rejected( 'error' )
    ) )
    .toEqual( { ...initialState, error: { message: 'error' } } );
  } );
} );
