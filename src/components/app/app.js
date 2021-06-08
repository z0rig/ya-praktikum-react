import React, { useEffect, useState } from 'react';

import AppMain from '../app-main/app-main';
import AppHeader from '../app-header/app-header';
import Spinner from '../spinner/spinner';
import Error from '../error/error';

import { INGREDIENTS_ULR } from '../../constants';

import { IngredientsContext } from '../../services/ingredients-context';

const App = () => {
  const [state, setstate] = useState( {
    isLoading: true,
    hasError: false,
    ingredients: []
  } );

  useEffect( () => {
    const fetchIngredients = async () => {
      try {
        const res = await fetch( INGREDIENTS_ULR );
        if ( res.ok ) {
          const ingredients = await res.json();

          setstate( {
            isLoading: false,
            hasError: false,
            ingredients: ingredients.data
          } );
        } else {
          throw new Error( 'Something went wrong ...' );
        }
      } catch ( err ) {
        setstate( {
          isLoading: false,
          hasError: true,
          ingredients: []
        } )
      }

    }

    fetchIngredients();
  }, [] )

  const { ingredients, isLoading, hasError } = state;
  return (
    <>
      <AppHeader />
      { isLoading && <Spinner /> }
      { hasError && <Error /> }
      {
        ingredients.length ?
          <IngredientsContext.Provider value={ { ingredients } }>
            <AppMain />
          </IngredientsContext.Provider> :
          null
      }
    </>
  );
}

export default App;
