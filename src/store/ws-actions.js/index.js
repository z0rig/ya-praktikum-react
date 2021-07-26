import allOrdersFeedActions from './ws-all-orders-feed-actions';
import userOrdersFeedActions from './ws-user-orders-feed-actions';
import commonActions from './ws-common-actions';

const wsActions = {
  allOrders: allOrdersFeedActions,
  userOrders: userOrdersFeedActions,
  common: commonActions
};

export default wsActions;
