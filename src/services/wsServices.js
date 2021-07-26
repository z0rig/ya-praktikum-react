import { WS_ALL_ORDERS_URL, WS_USER_ORDERS_URL } from '../utils/constants';
import { getCookie } from '../utils/cookie';

const wsServices = {
  allOrders: () => new WebSocket( WS_ALL_ORDERS_URL ),
  userOrders: () => new WebSocket( `${ WS_USER_ORDERS_URL }?token=${ getCookie( 'token' ).split( ' ' )[1] }` )
};

export default wsServices;
