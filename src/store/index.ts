import { configureStore } from '@reduxjs/toolkit';
import ordersFeedSocketMiddleware from './middlewares/ordersFeedSocketMiddleware';
import Api from '../services/api';

import rootReducer from './slices/index';

const store = configureStore( {
  reducer: rootReducer,
  middleware: ( getDefaultMiddleware ) =>
    getDefaultMiddleware( {
      thunk: {
        extraArgument: Api,
      },
    } )
    .concat( ordersFeedSocketMiddleware() ),
} );

export default store;
