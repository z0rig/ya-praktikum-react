import { TOrderStatuses } from '../types';

const BASE_URL = 'norma.nomoreparties.space';

export const INGREDIENTS_ULR =
  'https://' + BASE_URL + '/api/ingredients';

export const ORDERS_URL =
  'https://' + BASE_URL + '/api/orders';

export const PASSWORD_RESET_URL =
  'https://' + BASE_URL + '/api/password-reset';

export const LOGIN_URL =
  'https://' + BASE_URL + '/api/auth/login';

export const REGISTER_URL =
  'https://' + BASE_URL + '/api/auth/register';

export const LOGOUT_URL =
  'https://' + BASE_URL + '/api/auth/logout';

export const TOKEN_REFRESH_URL =
  'https://' + BASE_URL + '/api/auth/token';

export const USER_DATA_URL =
  'https://' + BASE_URL + '/api/auth/user';

export const WS_ALL_ORDERS_URL =
  'wss://' + BASE_URL + '/orders/all';

export const WS_USER_ORDERS_URL =
  'wss://' + BASE_URL + '/orders';

export const ORDER_STATUSES: TOrderStatuses = {
  done: 'Выполнен',
  pending: 'Готовится',
  created: 'Создан',
  cancel: 'Отменен'
};
