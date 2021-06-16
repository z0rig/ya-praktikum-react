import burgerIngredientsReducer from './burger-ingredients';
import burgerConstructorReducer from './burger-constructor';
import ingredientDetailReducer from './ingredient-details';
import orderDetailsReducer from './order-details';

const rootReducer = {
  burgerIngredients: burgerIngredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  ingredientDetails: ingredientDetailReducer,
  orderDetails: orderDetailsReducer
};

export default rootReducer;
