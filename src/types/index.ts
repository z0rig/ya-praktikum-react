import { Location } from 'history';
import store from '../store';


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type TIngredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  '__v': number;
  quantity?: number;
};

export type TBurgerConstructorIgredient = TIngredient & {
  constructorId: string;
}

export type TLocationState = {
  from: string;
  ingredientLocation?: Location;
  orderLocation?: Location;
}

export type TUserData = {
  email?: string;
  name?: string;
  password?: string;
  token?: string;
}

export type TOrderData = {
  number: number;
  createdAt: string;
  name: string;
  status: TStatusesCodes;
  ingredients: Array<string>;
}

export type TStatuses = 'Выполнен' | 'Готовится' | 'Создан' | 'Отменен';
export type TStatusesCodes = 'done' | 'pending' | 'created' | 'cancel';

export type TOrderStatuses = {
  [K in TStatusesCodes]: TStatuses;
};

export type TOrder = {
  ingredients: TIngredient[];
  number: number;
  _id: string;
  owner: TUserData;
  status: TStatusesCodes;
  name: string;
  createdAt: string;
  price: number;
}

export type TUserOrderData = {
  ingredients: Array<string>;
} & TOrder;

export type TPostedOrderDetails = {
  success: boolean;
  order: TOrder;
  name: string;
};

export type TUserOrder = {
  success: true;
  orders: Array<TUserOrderData>;
}

export interface IApi {
  getIngredienst: () => Promise<Response>;
  getOrderDetails: ( ingredientsIds: Array<string> ) => Promise<Response>;
  getOrderById: ( id: string ) => Promise<Response>;
  getUserData: () => Promise<Response>;
  setUserData: ( userData: TUserData ) => Promise<Response>;
  login: ( userData: TUserData ) => Promise<Response>;
  logout: () => Promise<Response>;
  register: ( userData: TUserData ) => Promise<Response>;
  checkEmailForPassReset: ( email: string ) => Promise<Response>;
  resetPassword: ( userData: TUserData ) => Promise<Response>;
  refreshToken: () => Promise<Response>;
}

export interface IAsyncThunkExtraArgument { extra: IApi; }
