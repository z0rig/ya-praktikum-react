import burgerIngredientsReducer from './burger-ingredients';
import burgerConstructorReducer from './burger-constructor';
import postedOrderDetailsReducer from './posted-order-details';
import forgotPasswordReducer from './forgot-password';
import registrationPageReducer from './registration';
import loginReducer from './login';
import resetPasswordReducer from './reset-password';
import profileReducer from './profile';
import allOrdersFeedReducer from './all-orders-feed';
import userOrdersFeedReducer from './user-orders-feed';
import userOrderReducer from './user-order';

const rootReducer = {
  burgerIngredients: burgerIngredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  postedOrderDetails: postedOrderDetailsReducer,
  forgotPassword: forgotPasswordReducer,
  registration: registrationPageReducer,
  login: loginReducer,
  resetPassword: resetPasswordReducer,
  profile: profileReducer,
  allOrdersFeed: allOrdersFeedReducer,
  userOrdersFeed: userOrdersFeedReducer,
  userOrder: userOrderReducer
};

export default rootReducer;
