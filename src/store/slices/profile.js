import { createAsyncThunk, createSlice, isPending, isRejected, isFulfilled } from '@reduxjs/toolkit';

import { login } from './login';
import { register } from './registration-page';

import { getCookie, deleteCookie } from '../../utils/cookie';

const isLogin = !!getCookie( 'token' );

export const initialState = {
  user: {
    email: '',
    name: '',
    isLogin,
  },
  loading: false,
  error: null,
};

const logout = createAsyncThunk(
  'profile/logout',
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
  'profile/getUserData',
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
  'profile/setUserData',
  async ( userData, { extra } ) => {
    const response = await extra.setUserData( userData );
    const json = await response.json();

    if ( !json.success ) {
      throw new Error( json.message );
    }

    return json;
  }
);

const isPendingAction = isPending( logout, getUserData, setUserData );
const isRejectedAction = isRejected( logout, getUserData, setUserData );
const isFulfilledAction = isFulfilled( register, login );

const profileSlice = createSlice( {
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: ( builder ) => {
    builder
      .addCase( logout.fulfilled, ( state ) => {
        state.user.isLogin = false;
      } )
      .addCase( getUserData.fulfilled, ( state, { payload: { user } } ) => {
        state.user = user;
        state.user.isLogin = true;
        state.loading = false;
        state.error = null;
      } )
      .addCase( setUserData.fulfilled, ( state, { payload: { user } } ) => {
        state.user = user;
        state.user.isLogin = true;
        state.loading = false;
        state.error = null;
      } )
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
          state.user = {
            email: '',
            name: '',
            isLogin: !!getCookie( 'token' )
          };
        }
      );
  }
} );

export { logout, getUserData, setUserData };
export default profileSlice.reducer;
