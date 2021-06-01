import React, { useEffect, useState } from 'react';

import AppMain from '../app-main/app-main';
import AppHeader from '../app-header/app-header';
import Spinner from '../spinner/spinner';

import { INGREDIENTS_ULR } from '../../constants';

const App = () => {
  const [state, setstate] = useState( {
    isLoading: true,
    hasError: false,
    ingredients: []
  } );

  useEffect( () => {
    fetch( INGREDIENTS_ULR )
      .then( ( res ) => res.json() )
      .then( ( ingredients ) => {
        setstate( {
          isLoading: false,
          hasError: false,
          ingredients: ingredients.data
        } );
      } )
      .catch( () => {
        setstate( {
          isLoading: false,
          hasError: true,
          ingredients: []
        } )
      } );
  }, [] )

  const { ingredients, isLoading, hasError } = state;
  return (
    <>
      <AppHeader />
      { isLoading && <Spinner /> }
      { hasError && 'Ошибка!' }
      { ingredients.length ? <AppMain ingredients={ state.ingredients } /> : null }
    </>
  );
}

export default App;
