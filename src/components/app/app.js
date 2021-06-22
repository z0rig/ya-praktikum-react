import React, { useEffect, useMemo } from 'react';
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

  const { loading, error } = useSelector( state => state.burgerIngredients );

  const mainContent = useMemo( () => {
    return (
      <>
        { loading && ( <Spinner /> ) }
        { error && ( <Error /> ) }
        {
          (!loading && !error) ?
          (
            <main className='pt-10'>
              <ConstructorPage />
            </main>
          ) :
          null
      }
      </>
    );
  }, [loading, error]);

  return (
    <>
      <AppHeader />
      { mainContent }
    </>
  );
};

export default App;
