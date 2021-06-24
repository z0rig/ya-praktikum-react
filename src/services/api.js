import { INGREDIENTS_ULR, ORDERS_URL } from '../utils/constants';

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
};

export default Api.instance();
