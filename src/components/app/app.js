import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchIngredients } from '../../store/slices/burger-ingredients';

import ConstructorPage from '../constructor-page/constructor-page';
import AppHeader from '../app-header/app-header';
import Spinner from '../spinner/spinner';
import Error from '../error/error';

const App = () => {
  const dispatch = useDispatch();

  useEffect( () => {
    dispatch( fetchIngredients() );
  }, [dispatch] );

  const ingredients = useSelector( state => state.burgerIngredients );
  const { loading, error, items } = ingredients;
  return (
    <>
      <AppHeader />
      { loading && ( <Spinner /> ) }
      { error && ( <Error /> ) }
      {
        items.length ?
          (
            <main className='pt-10'>
              <ConstructorPage />
            </main>
          ) :
          null
      }
    </>
  );
};

export default App;
