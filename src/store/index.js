import { configureStore } from '@reduxjs/toolkit';
import Api from '../services/api';

import rootReducer from './slices/index';

const store = configureStore( {
  reducer: rootReducer,
  middleware: ( getDefaultMiddleware ) =>
    getDefaultMiddleware( {
      thunk: {
        extraArgument: Api,
      },
    } ),
} );

export default store;
