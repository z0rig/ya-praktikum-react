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

class Api {
  static instance () {
    if ( !this._instance ) {
      this._instance = new Api();
    }
    return this._instance;
  }

  getIngredienst = async () => await fetch( new URL( INGREDIENTS_ULR ) );

  getOrderDetails = async ( ingredientsIds ) => {
    const url = new URL( ORDERS_URL );

    return await fetch( url, {
      'method': 'POST',
      'headers': {
        'Content-Type': 'application/json'
      },
      'body': JSON.stringify( { 'ingredients': ingredientsIds } )
    } );
  };

  getUserData = async () => {
    const url = new URL( USER_DATA_URL );

    return await fetch( url, {
      'method': 'GET',
      'headers': {
        'Content-Type': 'application/json',
        'Authorization': getCookie( 'token' )
      }
    } );
  }

  setUserData = async ( userData ) => {
    const url = new URL( USER_DATA_URL );

    return await fetch( url, {
      'method': 'PATCH',
      'headers': {
        'Content-Type': 'application/json',
        'authorization': getCookie( 'token' )
      },
      'body': JSON.stringify( userData )
    } );
  }

  login = async ( userData ) => {
    const url = new URL( LOGIN_URL );

    return await fetch( url, {
      'method': 'POST',
      'headers': {
        'Content-Type': 'application/json',
        'authorization': getCookie( 'token' )
      },
      'body': JSON.stringify( userData )
    } );
  }

  logout = async () => {
    const url = new URL( LOGOUT_URL );

    return await fetch( url, {
      'method': 'POST',
      'headers': {
        'Content-Type': 'application/json',
      },
      'body': JSON.stringify( { 'token': getCookie( 'refreshToken' ) } )
    } );
  }

  register = async ( userData ) => {
    const url = new URL( REGISTER_URL );

    return await fetch( url, {
      'method': 'POST',
      'headers': {
        'Content-Type': 'application/json'
      },
      'body': JSON.stringify( userData )
    } );
  }

  checkEmailForPassReset = async ( email ) => {
    const url = new URL( PASSWORD_RESET_URL );

    return await fetch( url, {
      'method': 'POST',
      'headers': {
        'Content-Type': 'application/json',
      },
      'body': JSON.stringify( { email } )
    } );
  }

  resetPassword = async ( userData ) => {
    const url = new URL( PASSWORD_RESET_URL + '/reset' );

    return await fetch( url, {
      'method': 'POST',
      'headers': {
        'Content-Type': 'application/json',
        'authorization': getCookie( 'refreshToken' )
      },
      'body': JSON.stringify( userData )
    } );
  }

  refreshToken = async () => {
    const url = new URL( TOKEN_REFRESH_URL );

    return await fetch( url, {
      'method': 'POST',
      'headers': {
        'Content-Type': 'application/json',
        'authorization': getCookie( 'refreshToken' )
      },
      'body': JSON.stringify( { 'token': getCookie( 'refreshToken' ) } )
    } );
  }
};

export default Api.instance();
