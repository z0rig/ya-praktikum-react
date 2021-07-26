import {
  wsConnectionSuccess,
  wsConnectionError,
  wsConnectionClosed,
  wsGetMessage
} from '../slices/user-orders-feed';

const userOrdersFeedActions = {
  onOpen: wsConnectionSuccess,
  onError: wsConnectionError,
  onClose: wsConnectionClosed,
  onMessage: wsGetMessage
};

export default userOrdersFeedActions;
