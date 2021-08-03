import {
  wsConnectionSuccess,
  wsConnectionError,
  wsConnectionClosed,
  wsGetMessage
} from '../slices/all-orders-feed';

const allOrdersFeedActions = {
  onOpen: wsConnectionSuccess,
  onError: wsConnectionError,
  onClose: wsConnectionClosed,
  onMessage: wsGetMessage
};

export default allOrdersFeedActions;
