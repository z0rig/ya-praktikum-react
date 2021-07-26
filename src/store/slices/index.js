import burgerIngredientsReducer from './burger-ingredients';
import burgerConstructorReducer from './burger-constructor';
import orderDetailsReducer from './order-details';
import forgotPasswordPageReducer from './forgot-password-page';
import registrationPageReducer from './registration-page';
import loginPagePageReducer from './login-page';
import resetPasswordPageReducer from './reset-password-page';
import profilePageReducer from './profile-page';
import allOrdersFeedReducer from './all-orders-feed';
import userOrdersFeedReducer from './user-orders-feed';
import userOrderReducer from './user-order';

const rootReducer = {
  burgerIngredients: burgerIngredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  orderDetails: orderDetailsReducer,
  forgotPassword: forgotPasswordPageReducer,
  registration: registrationPageReducer,
  login: loginPagePageReducer,
  resetPassword: resetPasswordPageReducer,
  profile: profilePageReducer,
  allOrdersFeed: allOrdersFeedReducer,
  userOrdersFeed: userOrdersFeedReducer,
  userOrder: userOrderReducer
};

export default rootReducer;
