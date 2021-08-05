import allOrdersFeedActions from './ws-all-orders-feed-actions';
import userOrdersFeedActions from './ws-user-orders-feed-actions';
import commonActions from './ws-common-actions';

type TWsActions = {
  allOrders: typeof allOrdersFeedActions;
  userOrders: typeof userOrdersFeedActions;
  common: typeof commonActions;
  [k: string]: any;
};

const wsActions:TWsActions = {
  allOrders: allOrdersFeedActions,
  userOrders: userOrdersFeedActions,
  common: commonActions
};

export default wsActions;
