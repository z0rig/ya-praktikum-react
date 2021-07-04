import { createAsyncThunk, createSlice, isPending, isRejected, isFulfilled } from '@reduxjs/toolkit';

import { login } from './login-page';
import { register } from './registration-page';

import { getCookie, deleteCookie } from '../../utils/cookie';

const isLogin = !!getCookie( 'token' );

const initialState = {
  user: {
    email: '',
    name: '',
    isLogin,
  },
  loading: false,
  error: null,
};

const logout = createAsyncThunk(
  'profilePage/logout',
  async ( _, { extra } ) => {
    const response = await extra.logout();
    const json = await response.json();

    if ( !json.success ) {
      throw new Error( json.message );
    }

    deleteCookie( 'token' );

    return json;
  }
);

const getUserData = createAsyncThunk(
  'profilePage/getUserData',
  async ( _, { extra } ) => {
    const response = await extra.getUserData();
    const json = await response.json();

    if ( !json.success ) {
      throw new Error( json.message );
    }

    return json;
  }
);

const setUserData = createAsyncThunk(
  'profilePage/setUserData',
  async ( userData, { extra } ) => {
    const response = await extra.setUserData( userData );
    const json = await response.json();

    if ( !json.success ) {
      throw new Error( json.message );
    }

    return json;
  }
);

const isPendingAction = isPending( logout, getUserData ,setUserData );
const isRejectedAction = isRejected( logout, getUserData, setUserData );
const isFulfilledAction = isFulfilled( register, login, getUserData );

const profilePageSlice = createSlice( {
  name: 'profilePage',
  initialState,
  reducers: {},
  extraReducers: ( builder ) => {
    builder
      .addCase( logout.fulfilled, () => initialState )
      .addMatcher(
        isFulfilledAction,
        ( state, { payload: { user } } ) => {
          state.user = { ...user, isLogin: true };
        } )
      .addMatcher(
        isPendingAction,
        ( state, _ ) => {
          state.loading = true;
          state.error = null;
        } )
      .addMatcher(
        isRejectedAction,
        ( state, action ) => {
          state.loading = false;
          state.error = action.error;
          state.user.isLogin = false;
        }
      );
  }
} );

export { logout, getUserData, setUserData };
export default profilePageSlice.reducer;
