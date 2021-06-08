import React from 'react';
import PropTypes from 'prop-types';

import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

const ActiveBun = ( { children, bun } ) => {
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
  bun: PropTypes.shape( {
    _id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
    calories: PropTypes.number,
    price: PropTypes.number,
    image: PropTypes.string,
    image_mobile: PropTypes.string,
    image_large: PropTypes.string,
    __v: PropTypes.number,
  } )
};
