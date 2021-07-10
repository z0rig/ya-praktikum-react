import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './active-bun.module.css';

const ActiveBun = ( { children } ) => {
  const { bun } = useSelector( state => state.burgerConstructor );

  if ( !bun ) {
    return (
      <div className={ styles.placeholder }>
        <p className={ styles.text }>Булка не выбрана(( <br /> Тащи её сюда!</p>
        { children }
      </div>
    );
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

ActiveBun.propTypes = {
  children: PropTypes.element
};
