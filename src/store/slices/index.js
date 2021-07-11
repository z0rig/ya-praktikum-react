import burgerIngredientsReducer from './burger-ingredients';
import burgerConstructorReducer from './burger-constructor';
import orderDetailsReducer from './order-details';
import forgotPasswordPageReducer from './forgot-password-page';
import registrationPageReducer from './registration-page';
import loginPagePageReducer from './login-page';
import resetPasswordPageReducer from './reset-password-page';
import profilePageReducer from './profile-page';

const rootReducer = {
  burgerIngredients: burgerIngredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  orderDetails: orderDetailsReducer,
  forgotPassword: forgotPasswordPageReducer,
  registration: registrationPageReducer,
  login: loginPagePageReducer,
  resetPassword: resetPasswordPageReducer,
  profile: profilePageReducer
};

export default rootReducer;
