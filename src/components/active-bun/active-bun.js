import React from 'react';
import { useSelector } from 'react-redux';

import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

const ActiveBun = ( { children } ) => {
  const { bun } = useSelector( state => state.burgerConstructor );

  if ( !bun ) {
    return ( <>
      Булка не выбрана((
      { children }
    </> );
  }
  return (
    <>
      <ConstructorElement
        price={ bun.price }
        thumbnail={ bun.image }
        text={ `${ bun.name } (верх)` }
        type='top'
        isLocked={ true }
      />
      { children }
      <ConstructorElement
        price={ bun.price }
        thumbnail={ bun.image }
        text={ `${ bun.name } (низ)` }
        type='bottom'
        isLocked={ true }
      />
    </>
  );
};


export default ActiveBun;
