import {
  INGREDIENTS_ULR,
  ORDERS_URL,
  PASSWORD_RESET_URL,
  REGISTER_URL,
  LOGIN_URL,
  TOKEN_REFRESH_URL,
  LOGOUT_URL,
  USER_DATA_URL
} from '../utils/constants';

import { getCookie } from '../utils/cookie';

import { IApi, TUserData } from '../types';

class Api implements IApi{
  private static _instance: Api;

  public static instance() {
    if ( !this._instance ) {
      this._instance = new Api();
    }
    return this._instance;
  }

  getIngredienst = async () => await fetch(
    String(
      new URL( INGREDIENTS_ULR )
    )
  );

  getOrderDetails = async ( ingredientsIds: Array<string> ) => {
    const url: URL = new URL( ORDERS_URL );

    return await fetch( String( url ), {
      'method': 'POST',
      'headers': {
        'Content-Type': 'application/json',
        'Authorization': String( getCookie( 'token' ) )
      },
      'body': JSON.stringify( { 'ingredients': ingredientsIds } )
    } );
  };

  getOrderById = async ( id: string ) => {
    const url = String( new URL( ORDERS_URL + '/' + id ) );

    return await fetch( url, {
      'method': 'GET',
      'headers': {
        'Content-Type': 'application/json'
      }
    } );
  }

  getUserData = async () => {
    const url = String( new URL( USER_DATA_URL ) );

    return await fetch( url, {
      'method': 'GET',
      'headers': {
        'Content-Type': 'application/json',
        'Authorization': String( getCookie( 'token' ) )
      }
    } );
  }

  setUserData = async ( userData: TUserData ) => {
    const url = String( new URL( USER_DATA_URL ) );

    return await fetch( url, {
      'method': 'PATCH',
      'headers': {
        'Content-Type': 'application/json',
        'authorization': String( getCookie( 'token' ) )
      },
      'body': JSON.stringify( userData )
    } );
  }

  login = async ( userData: TUserData ) => {
    const url = String( new URL( LOGIN_URL ) );

    return await fetch( url, {
      'method': 'POST',
      'headers': {
        'Content-Type': 'application/json'
      },
      'body': JSON.stringify( userData )
    } );
  }

  logout = async () => {
    const url = String( new URL( LOGOUT_URL ) );

    return await fetch( url, {
      'method': 'POST',
      'headers': {
        'Content-Type': 'application/json',
      },
      'body': JSON.stringify( { 'token': getCookie( 'refreshToken' ) } )
    } );
  }

  register = async ( userData: TUserData ) => {
    const url = String( new URL( REGISTER_URL ) );

    return await fetch( url, {
      'method': 'POST',
      'headers': {
        'Content-Type': 'application/json'
      },
      'body': JSON.stringify( userData )
    } );
  }

  checkEmailForPassReset = async ( email: string ) => {
    const url = String( new URL( PASSWORD_RESET_URL ) );

    return await fetch( url, {
      'method': 'POST',
      'headers': {
        'Content-Type': 'application/json',
      },
      'body': JSON.stringify( { email } )
    } );
  }

  resetPassword = async ( userData: TUserData ) => {
    const url =  String( new URL( PASSWORD_RESET_URL + '/reset' ) );

    return await fetch( url, {
      'method': 'POST',
      'headers': {
        'Content-Type': 'application/json'
      },
      'body': JSON.stringify( userData )
    } );
  }

  refreshToken = async () => {
    const url =  String( new URL( TOKEN_REFRESH_URL ) );

    return await fetch( url, {
      'method': 'POST',
      'headers': {
        'Content-Type': 'application/json',
        'authorization':  String( getCookie( 'refreshToken' ) )
      },
      'body': JSON.stringify( { 'token': getCookie( 'refreshToken' ) } )
    } );
  }
};

export default Api.instance();
