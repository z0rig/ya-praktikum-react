import { createAsyncThunk, createSlice, isPending, isRejected, isFulfilled, SerializedError } from '@reduxjs/toolkit';

import { login } from './login';
import { register } from './registration';

import { getCookie, deleteCookie } from '../../utils/cookie';

import { IAsyncThunkExtraArgument, TUserData } from '../../types';

const isLogin = !!getCookie( 'token' );

interface IProfileState {
  user: TUserData & { isLogin: boolean },
  loading: boolean
  error: SerializedError | null
}

export const initialState: IProfileState = {
  user: {
    email: '',
    name: '',
    isLogin,
  },
  loading: false,
  error: null,
};

const logout = createAsyncThunk<
  {},
  void,
  IAsyncThunkExtraArgument
>
(
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

const getUserData = createAsyncThunk<
  {user: TUserData & { isLogin?: boolean } },
  void,
  IAsyncThunkExtraArgument
>
(
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

const setUserData = createAsyncThunk<
  {user: TUserData & { isLogin?: boolean } },
  TUserData,
  IAsyncThunkExtraArgument
>
(
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
        state.user = { ...user, isLogin: true };
        state.loading = false;
        state.error = null;
      } )
      .addCase( setUserData.fulfilled, ( state, { payload: { user } } ) => {
        state.user = { ...user, isLogin: true };
        state.loading = false;
        state.error = null;
      } )
      .addMatcher(
        isFulfilledAction,
        ( state, payload ) => {
          state.user = { ...payload, isLogin: true };
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
